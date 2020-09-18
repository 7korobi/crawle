
require 'yaml'
require 'json'

OUTPUT = "./data/giji-json/"

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

