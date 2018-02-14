TEX=latexmk
TEXOPTS=-output-directory=build \
		-pdf \
		-latexoption=-interaction=nonstopmode \
		-latexoption=-file-line-error
COLORIZE=grep --color -E ".*Warning.*|.*Missing.*|$$"

ifdef PREVIEW
PREVIEWOPTS=-pvc
endif

defaul: all
all: report

# Create build directory if it doesnt exist
builddir:
	@[[ -d build ]] || mkdir build

report: report.tex
	@$(TEX) $(TEXOPTS) $(PREVIEWOPTS) $< | $(COLORIZE)

clean:
	@rm -rf build/*

