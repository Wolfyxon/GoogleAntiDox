NAME := GoogleAntiDox
OUTFILE := $(NAME).xpi

build:
	cd extension && zip -r ../$(OUTFILE) .

clean:
	rm -f *.xpi
	rm -f *.sig
