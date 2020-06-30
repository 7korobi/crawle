require 'fileutils'

DST = '/mnt/c/Dropbox'
SRC = '/mnt/c/Documents'

CMD_PATH = File.expand_path $0
BAT = open("#{CMD_PATH}.bat", "wb")
SH = open("#{CMD_PATH}.sh", "w")

BAT.puts "rem  created at #{Time.now}"
SH.puts "# created at #{Time.now}"

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
      clean dest
      clean src
    end

    Dir.glob("#{DST}/#{rule}/#{tail}").each do |dest|
      src = dest.gsub /^#{DST}/, SRC
      list.push [dest, src]
      clean dest
      clean src
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
  SH.puts
  SH.puts "# #{msg}"

  BAT.puts
  BAT.puts "rem #{win msg}"
end

def rmtree(tgt)
  FileUtils.rmtree(tgt)
  SH.puts "# rm -rf #{ tgt }"
  BAT.puts "rem rd /s /Q #{win tgt}"
end

def rm(tgts)
  tgts.each do |tgt|
    FileUtils.rm(tgt)
    SH.puts "# rm -f #{ tgt }"
    BAT.puts "rem del /s /Q #{win tgt}"
  end
end

def mkpath(tgt)
  FileUtils.mkpath(tgt)
  SH.puts "# mkdir -p #{ tgt }"
  BAT.puts "rem mkdir -p #{win tgt}"
end


def symlink(src, dest)
  # FileUtils.symlink(src, dest)
  SH.puts "ln -s #{src} #{dest}"
  BAT.puts "mklink /D #{win dest} #{win src}"
end

def clean(path)
  Dir.glob("#{path} \(*").each(&:rmtree)
end
