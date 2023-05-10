#include "kissfft-131.1.0/kiss_fft.h"
#include <emscripten.h>
#include <stdlib.h>
#include <math.h>

#define PI 3.14159265358979323846

// ===============================
double midicent2Freq(double midicent) {
    double freq = 440 * pow(2, (midicent - 6900) / 1200);
    return freq;
}

// ===============================
EMSCRIPTEN_KEEPALIVE
void generate_sine_wave(float frequency, float samplerate, float duration, double *output) {
    float sample_rate = samplerate; // sample rate of 44.1 kHz
    float num_samples = sample_rate * duration / 1000; // calculate number of samples
    double increment = (double) frequency * 2.0 * PI / (double) sample_rate; // calculate the phase increment
    double phase = 0.0;
    double amplitude = 0.0;

    // calculate number of samples for fade-in and fade-out
    int fade_samples = sample_rate * 300 / 1000;

    // apply fade-in
    for (int i = 0; i < fade_samples; i++) {
        amplitude = (double) i / (double) fade_samples;
        output[i] = sin(phase) * amplitude;
        phase += increment;
    }

    // generate full-amplitude samples
    for (int i = fade_samples; i < num_samples - fade_samples; i++) {
        output[i] = sin(phase);
        phase += increment;
    }

    // apply fade-out
    for (int i = num_samples - fade_samples; i < num_samples; i++) {
        amplitude = (double) (num_samples - i) / (double) fade_samples;
        output[i] = sin(phase) * amplitude;
        phase += increment;
    }
}


/*
// ===============================
EMSCRIPTEN_KEEPALIVE
void generate_sines_wave(float* frequencies, float* amplitudes, int num_freq, float samplerate, float duration, double* output) {
    // float sample_rate = samplerate; // sample rate of 44.1 kHz
    float num_samples = samplerate * duration / 1000; // calculate number of samples
    int fade_samples = samplerate * 300 / 1000;
    double increment;  // = (double) frequency * 2.0 * PI / (double) sample_rate; // calculate the phase increment
    double amplitude;
    double phase; 

    for (int j = 0; j < num_freq; j++) {
        phase = 0.0;
        increment = (double)frequencies[j] * 2.0 * PI / (double) samplerate;

        // generate full-amplitude samples
        for (int i = 0; i < num_samples; i++) {
            output[i] = (sin(phase) + output[i]) * amplitudes[j];
            phase += increment;
        }

        // apply fade-in
        for (int i = 0; i < fade_samples; i++) {
            amplitude = (double) i / (double) fade_samples;
            output[i] = output[i] * amplitude;
            phase += increment;
        }

        // apply fade-out
        for (int i = num_samples - fade_samples; i < num_samples; i++) {
            amplitude = (double) (num_samples - i) / (double) fade_samples;
            output[i] = output[i] * amplitude;
            phase += increment;
        }
    }
}

*/


// ===============================

EMSCRIPTEN_KEEPALIVE
void fft(double* in, int nfft, int inverse, float* out, int sampleRate) {
    kiss_fft_cfg cfg = kiss_fft_alloc(nfft, inverse, 0, 0);
    if (cfg == NULL) {
        printf("Error: Failed to allocate memory for the FFT configuration.\n");
        return;
    }
    kiss_fft_cpx* input = (kiss_fft_cpx*)malloc(sizeof(kiss_fft_cpx) * nfft);
    kiss_fft_cpx* output = (kiss_fft_cpx*)malloc(sizeof(kiss_fft_cpx) * nfft);
    if (input == NULL || output == NULL) {
        printf("Error: Failed to allocate memory for the input/output buffers.\n");
        kiss_fft_free(cfg);
        free(input);
        free(output);
        return;
    }
    // print first value of in[0] to check if it is a pointer

    // apply hanning window
    for (int i = 0; i < nfft; i++) {
        in[i] *= 0.5 * (1 - cos(2 * M_PI * i / (nfft - 1)));
    }

    // copy the input data
    for (int i = 0; i < nfft; i++) {
        input[i].r = in[i];
        input[i].i = 0;
    }

    // perform the FFT
    kiss_fft(cfg, input, output);
    kiss_fft_free(cfg);

    float amp;
    for (int i = 0; i < nfft; i++) {
        amp = sqrt(output[i].r * output[i].r + output[i].i * output[i].i);
        out[i] = 20 * log10(amp / (nfft / 4.0));
    }

    // calculate frequencies
    float *outs = (float*)malloc(sizeof(float) * nfft * 2);

    // get local Maxima
    for  (int i = 0; i < nfft; i++) {
        float a = out[i - 1];
        float b = out[i];
        float c = out[i + 1];
        if (a < b && b > c) {
            float bin = i;
            float parabolicBin = 0.5 * (a - c) / (a - (2 * b) + c);
            float freq = (bin + parabolicBin) * sampleRate / nfft;
            // printf("freq: %f, amp: %f\n", freq, b);
            if (freq > midicent2Freq(4500) && freq < midicent2Freq(7400)) {
                outs[2 * i] = freq;
                outs[2 * i + 1] = b;
            }
            else {
                outs[2 * i] = 0;
                outs[2 * i + 1] = 0;
            }
        }
        else {
            outs[2 * i] = 0;
            outs[2 * i + 1] = 0;
        }
    }
    
    // copy outs to out
    for (int i = 0; i < nfft * 2; i++) {
        out[i] = outs[i];
    }
    free(outs);
    free(input);
    free(output);
}


