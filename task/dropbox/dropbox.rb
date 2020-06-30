#! wsl /home/giji/.rvm/wrappers/default/ruby

BAT = open("#{__dir__}/#{__FILE__}.bat", "wb")
SH = open("#{__dir__}/#{__FILE__}.sh", "w")

require './lib/file'

rm Dir.glob("#{DST}/**/*の競合コピー*")