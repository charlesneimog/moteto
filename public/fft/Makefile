CC = emcc
CFLAGS = -I./kissfft-131.1.0 -O3
LDFLAGS = -s WASM=1 -s EXPORTED_FUNCTIONS='["_malloc", "_free", "_fft"]' -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'
SRC = kissfft.c ./kissfft-131.1.0/kiss_fft.c
OBJ = $(SRC:.c=.o)
TARGET = kissfft.html

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CC) $(OBJ) $(LDFLAGS) -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ) $(TARGET)

