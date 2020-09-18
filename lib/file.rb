require 'fileutils'

DST = '/mnt/c/Dropbox'
SRC = '/mnt/c/Documents'

FILES = {
  BAT: nil,
  SH: nil,
}

def init(path)
  FILES[:BAT] = open("#{path}.bat", "wb")
  FILES[:SH] = open("#{path}.sh", "w")
  FILES[:BAT].puts "rem  created at #{Time.now}"
  FILES[:SH].puts "# created at #{Time.now}"
end

def crawle(tail, paths)
  list = []

  paths.each do |rule|
    Dir.glob("#{SRC}/www/*").each do |src|
      src = "#{src}/#{tail}"
      dest = src.gsub /^#{SRC}/, DST
      list.push [dest, src]
    end

    Dir.glob("#{SRC}/#{rule}/#{tail}").each do |src|
      dest = src.gsub /^#{SRC}/, DST
      list.push [dest, src]
    end

    Dir.glob("#{DST}/#{rule}/#{tail}").each do |dest|
      src = dest.gsub /^#{DST}/, SRC
      list.push [dest, src]
    end
  end

  list.sort.uniq.map do |dest, src|
    mode = yield dest, src
    [mode, dest, src]
  end.sort
end


def ls(paths)
  list = []
  [SRC,DST].each do |hd|
    paths.each do |tl|
      list.push "#{hd}/#{tl}"
    end
  end
  puts `ls -ld #{list.join(' ')}`
end

def win(str)
  str.gsub("/mnt/c/","C:\\").gsub("/","\\")
end

def comment(msg)
  FILES[:SH].puts
  FILES[:SH].puts "# #{msg}"

  FILES[:BAT].puts
  FILES[:BAT].puts "rem #{win msg}"
end

def rmtree(tgt)
  FileUtils.rmtree(tgt)
  FILES[:SH].puts "# rm -rf #{ tgt }"
  FILES[:BAT].puts "rem rd /s /Q #{win tgt}"
end

def rm(tgts)
  tgts.each do |tgt|
    FileUtils.rm(tgt)
    FILES[:SH].puts "# rm -f #{ tgt }"
    FILES[:BAT].puts "rem del /s /Q #{win tgt}"
  end
end

def mkpath(tgt)
  FileUtils.mkpath(tgt)
  FILES[:SH].puts "# mkdir -p #{ tgt }"
  FILES[:BAT].puts "rem mkdir -p #{win tgt}"
end


def symlink(src, dest)
  # FileUtils.symlink(src, dest)
  FILES[:SH].puts "ln -s #{src} #{dest}"
  FILES[:BAT].puts "mklink /D #{win dest} #{win src}"
end
