#! wsl /home/giji/.rvm/wrappers/default/ruby

require_relative '../../lib/file'

init('./cmd/clean')

rm Dir.glob("#{DST}/**/*の競合コピー*")