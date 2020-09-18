#! wsl /home/giji/.rvm/wrappers/default/ruby

require_relative '../../lib/file'

NOP = -1
COMPLETE = 0
EMPTY = 1
LINK = 2

init('./cmd/symlink')

crawle(['node_modules', 'data'], [
  'www/*/*',
  'www/*',
]) do |dest, src, tail|
  if File.symlink?(dest) && File.directory?(src)
    if 0 < Dir.glob("#{src}/*").size
      COMPLETE
    else
      EMPTY
    end
  else
    case tail
    when 'data'
      if File.directory?(src)
        LINK
      else
        NOP
      end
    when 'node_modules'
      LINK
    end
  end

end.each do |mode, dest, src|
  case mode
  when COMPLETE
    size = Dir.glob("#{src}/*").size
    comment " #{ dest } #{ size }"

  when EMPTY
    comment " empty. #{ dest }"

  when LINK
    comment " #{ dest } -> #{ src }"
    mkpath src
    rmtree dest
    symlink src, dest

  end
end
