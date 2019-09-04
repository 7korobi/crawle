# -*- encoding: utf-8 -*-
# set RUBYOPT=-EUTF-8

require "./lib/packer"
ENV.win

class Media::Base
  def self.scan_path
    "S://MEDIA/BitTorrent/**"
  end
  def head_path
    @src[/^.*\/BitTorrent/]
  end
end


pack = Packer.new
pack.add Media::Movie.glob
pack.encode
pack.exec

