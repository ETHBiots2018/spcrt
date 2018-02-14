SC=solc
SFLAGS=--overwrite \
	   -o bin \
	   --bin \
	   --ast \
	   --asm \
	   --abi

default: spcrt

spcrt: SPCRT.sol
	$(SC) $(SFLAGS) SPCRT.sol

clean:
	rm -rf bin/*
