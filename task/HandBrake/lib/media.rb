# -*- encoding: utf-8 -*-
# set RUBYOPT=-EUTF-8

require "./task/HandBrake/lib/media/base"
require "./task/HandBrake/lib/media/copy"
require "./task/HandBrake/lib/media/handbrake"

require "./task/HandBrake/lib/media/bdmv"
require "./task/HandBrake/lib/media/album"
require "./task/HandBrake/lib/media/movie"
require "./task/HandBrake/lib/media/hevc"


STAMP = Time.now.strftime("%Y-%m-%d.%H")
ENV = Struct.new(:cli, :tmp_dir, :work_dir, :deploy_log, :release_log).new
def ENV.win
  ENV.cli = "/mnt/c/Document/bin/HandBrakeCLI.exe"
  ENV.work_dir = "/mnt/c/MEDIA/WORK"
  ENV.deploy_log = "/mnt/c/MEDIA/bat/#{STAMP}-encode.bat"
  ENV.release_log = "/mnt/c/MEDIA/bat/#{STAMP}-release.bat"
  def ENV.path(str)
    win = str.gsub(%r[^/mnt/c/],'C:/').gsub(%r[/],'\\')
    %Q|"#{win}"|
  end
end

def ENV.mac
  ENV.cli = "/www/bin/HandBrakeCLI"
  ENV.work_dir = ""
  ENV.deploy_log = "/tmp/#{STAMP}-encode.bat"
  ENV.release_log = "/tmp/#{STAMP}-release.bat"
  def ENV.path(str)
    %Q|"#{str}"|
  end
end

class String
  def path
  	ENV.path(self)
  end
end
