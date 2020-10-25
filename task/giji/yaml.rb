
require 'yaml'
require 'json'

OUTPUT = "./data/giji-json/"

FNAME_SNAP_HD     = "../giji/yaml/work_geo_"
FNAME_OUTPUT_YAML = "../giji/yaml/work_geo.yml"
YAML.load_file(FNAME_OUTPUT_YAML)
YAML.load_file(FNAME_SNAP_HD + "name.yml")
YAML.load_file(FNAME_SNAP_HD + "label.yml")
YAML.load_file(FNAME_SNAP_HD + "etc.yml")
YAML.load_file(FNAME_SNAP_HD + "dic.yml")
YAML.load_file(FNAME_SNAP_HD + "orm.yml")

villages = []
chrsets = []
Dir.glob('./data/giji-json-vil/*').each do |path|
  File.open(path,'r') do |f|
    villages.push f.read
  end
end

Dir.glob('../giji-next/src/yaml/*').each do |path|
  fname = path.split("/").last
  next if %r[/work_] === path

  data = YAML.load_file path
  if Hash === data && !( %r[/cs_|/random|/rule] === path )
    list = []
    data.each do |id, o|
      o[:_id] = id
      list.push o
    end
    data = list
  end

  str = JSON.generate data
  if %r[/cs_] === path
    chrsets.push str
    next
  end
  File.open(OUTPUT + fname + ".json", 'w') do |f|
    f.print str
  end
end


json_chrsets = "[#{chrsets.join(',')}]"
File.open(OUTPUT + "chrsets.yaml.json", 'w') do |f|
  f.print json_chrsets
end

json_villages = "[#{villages.join(',')}]"
File.open(OUTPUT + "villages.json", 'w') do |f|
  f.print json_villages
end

