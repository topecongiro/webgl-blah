#!/usr/bin/env python3

import pathlib
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('source', type=pathlib.Path)
parser.add_argument('target', type=pathlib.Path)
args = parser.parse_args()
source = args.source
target = args.target

target.mkdir(parents=True, exist_ok=True)

def list_files_with_exts(dir, exts):
    result = []
    for ext in exts:
        result.extend(pathlib.Path(dir).glob(ext))
    return result

for file_name in list_files_with_exts(source, ['*.vert', '*.frag']):
    with open(file_name) as f:
        shader_content = f.read()
        file_name_replaced = file_name.name.replace('.', '_')
        js_str_var_name = 'shader_' + file_name_replaced
        js_str = "export {%s as default};\n" % js_str_var_name;
        js_str += 'const ' + js_str_var_name + ' =`' + shader_content + '\n`;';
        js_file_name = pathlib.Path(file_name_replaced).with_suffix('.mjs')
        with open(target / js_file_name.name, "w+") as out:
            out.write(js_str)