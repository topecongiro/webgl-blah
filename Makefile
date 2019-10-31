.PHONY: build_shaders

VERTEX_SHADERS=$(wildcard shaders/*.vert)
FRAGMENT_SHADERS=$(wildcard shaders/*.frag)

build_shaders: $(VERTEX_SHADERS) $(FRAGMENT_SHADERS)
	python3 scripts/convert-shaders.py shaders shaders