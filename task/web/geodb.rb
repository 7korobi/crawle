require 'open-uri'
require "net/http"
require 'zip'
require 'yaml'
require 'json'

FNAME_GEOCODE_ZIP = "data/tmp/geolist.zip"
FNAME_ZIPCODE_ZIP = "data/tmp/zipcode.zip"

FNAME_GEOCODE = "data/geolist_utf8.csv"
FNAME_ZIPCODE = "data/zipcode_sjis.csv"


FNAME_SNAP_HD     = "../giji-fire-new/yaml/work_geo_"
FNAME_OUTPUT_YAML = "../giji-fire-new/yaml/work_geo.yml"

POSTS_JIS_ZIP = {}
POSTS_ZIP = {}
POSTS_JIS = {}
ORM = {}
ORM_CODE = {}

GEOS = []
NAME_GEOS = {}

ETCS = {}
NAMES = {}
LABELS = {}

DIC = {}
TO_PREFECTURE = {}

PAST_DIC = YAML.load_file(FNAME_SNAP_HD + "dic.yml")

def find_header(*args)
  ( 1 .. args.map(&:size).min ).reverse_each do |idx|
    return args[0][0..idx] if 1 == args.map {|arg| arg[0..idx] }.uniq.size 
  end
  nil
end

def cut(src, r, sep, gap, safe )
  saves = src.scan(safe)
  saves.each_with_index {|saved, idx| src.sub!(saved,"@#{idx}@") }
  hit = src[r]
  if hit
    src[r] = ""
    list = hit.tr(sep,"").split(gap)
    if saves
      saves.each_with_index do |saved, idx|
        list.each do |s|
          s.sub!("@#{idx}@", saved)
        end
      end
    end
  else
    list = []
    if saves
      saves.each_with_index do |saved, idx|
        src.sub!("@#{idx}@", saved)
      end
    end
  end
  list.uniq.select {|s| ! [nil,""].member? s }
end

def to_etc(sep, *ary)
  ary.map {|s| s.tr(sep,"") }.uniq.select {|s| ! [nil, ""].member? s }
end

def label_reduce(root, checker = {}, dest = {})
  root.each do |key, item|
    dest[key] = LABELS[key]
    check = checker[LABELS[key]]
    if 0 == item || 0 == item.size
      check = checker[LABELS[key]] = 0
    else
      unless Hash === check
        check = checker[LABELS[key]] = {}
      end
      label_reduce(item, check, dest)
    end
  end
  dest
end

def name_reduce!(root)
  news = {}
  root.each do |key, item|
    next if 0 == item
    next if 0 == item.size
    if 1 == item.size
      new_key = item.keys[0]
      new_val = item.values[0]
      news[new_key] = new_val
      LABELS[new_key] = LABELS[key]
      root.delete(key)
    else
      item.replace name_reduce!(item).sort.to_h
    end
  end
  news.each do |key, val|
    root[key] = val
  end
  if 0 < news.size
    name_reduce!(root)
  end
  root
end

REG_NUMBER_FT = /(第)?[０-９].+$|[東西南北]?[０-９一二三四五六七八九十廿]+(?:条通り|番町|条町|日市|ノ宮|条|番|区)$/
REG_NUMBER_HD = /^一番堀通町|深草大亀谷|^嵯峨小倉|^横大路下|^粟島浦村|^宇多野|^下鳥羽|^上鳥羽|^水海道|^五個荘|^松ケ崎|^岩船郡|^都祁|^.+?[堂寺院](ノ前|門前)?|^.+?(島|温泉|寺|院)|^[東西南北]?[０-９一二三四五六七八九十廿]+(?:条通り|番町|条町|日市|ノ宮|条|番|区)/
def label_set(list, name, label)
  if name[/#{label}.#{label}$/]
    LABELS[name] = label
    unit = nil
  else
    (LABELS[name], unit) = label.split(/(町区$|地区$|[都府県市郡区村町]$)/)
  end

  _id = list.join("-")
  ORM[name] = {
    "_id"        => _id,
    "name"       => name,
    "label"      => LABELS[name],
    "unit"       => unit,
  }

  return if unit == label
  return unless unit
  label.tr!("()（）","")
  unit.tr!("()（）","")
  prefecture = list[0]

  if /甲子園/ === name
    puts list.join(" ")
  end
  if 2 < list.size && /([都府県市郡区村町]$)/ === list[-2] && /(^[都府県市郡区村町])/ === list[-1]
    puts list.join(" ")
  end

  chk = PAST_DIC[prefecture]['dic']
  DIC[prefecture] ||= {'dic' => chk, 'cut' => PAST_DIC[prefecture]['cut']}
  DIC[prefecture][unit] ||= []
  DIC[prefecture][unit].push label
  dic =      DIC[prefecture]['dic']
  cut =      DIC[prefecture]['cut']

  return if PAST_DIC[label]
  unless dic.member? label
    if /島$|[都道府県島市郡区村町寺院].+/ === label
      dic.push label
    end
  end

  if REG_NUMBER_FT === label
    head = label.sub(REG_NUMBER_FT,"")
    foot = label[REG_NUMBER_FT]
    case head.size
    when 0, 1
      dic.push label unless dic.member? label
    else
      puts [prefecture, chk.member?(head), dic.member?(head), "2...", head, foot, "  ", list].join(" ")
      cut.push head unless cut.member? head
      dic.push head unless dic.member? head
    end
  end
  if REG_NUMBER_HD === label
    foot = label.sub(REG_NUMBER_HD,"")
    head = label[REG_NUMBER_HD]
    case foot.size
    when 0, 1
      dic.push label unless dic.member? label
    else
      puts [prefecture, chk.member?(head), dic.member?(head), "4...", head, foot, "  ", list].join(" ")
      cut.push head unless cut.member? head
      dic.push head unless dic.member? head
    end
  end
end

def name_set(names, *dirty)
  (*args, tail) = dirty.select {|s| s != "" }
  head = ""
  list = []
  args.each_with_index do |arg, idx|
    head = head + arg
    list.push arg
    unless Hash === names[head]
      names[head] = {}
    end
    names = names[head]
    label_set(list, head, arg)
  end
  if tail.start_with? head
    full = tail
  else
    if ["#{head[-1]}庁","#{head[-1]}役所"].member? tail
      full = head + tail[1..]
    else
      full = head + tail
    end
    list.push tail
  end
  names[full] ||= 0
  label_set(list, full, tail)
  full
end

# katakana to hiragana for utf-8
def to_hiragana(src)
  src.codepoints.collect do |cp|
    if ( 0x30a1 .. 0x30f6 ) === cp
      (cp - 0x60).chr("UTF-8")
    else
      cp.chr("UTF-8")
    end
  end.join("")
end

# hiragana to katakana for utf-8
def to_katakana(src)
  src.codepoints.collect do |cp|
    if ( 0x3041 .. 0x3096 ) === cp
      (cp + 0x60).chr("UTF-8")
    else
      cp.chr("UTF-8")
    end
  end.join("")
end


=begin
uri = URI.parse("http://www.amano-tec.com/data/download.php")
http = Net::HTTP.new(uri.host, uri.port)
req = Net::HTTP::Post.new(uri.path)
req.set_form_data({ name: "", email: "", org: "", usage: "", mail_set: 'confirm_submit', filenumber: '3', x: '78', y: '12', httpReferer: 'http://www.amano-tec.com/data/localgovernments.html' })
req.initialize_http_header({
  "Accept" => "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
  "Accept-Encoding" => "gzip, deflate",
  "Accept-Language" => "ja,en-US;q=0.9,en;q=0.8",
  "Cache-Control" => "max-age=0",
  "Connection" => "keep-alive",
  "Cookie" =>  "_ga=GA1.2.1709699922.1566976834; _gid=GA1.2.889992052.1566976834; i18next=ja; _gat=1",
  "Origin" => "http://www.amano-tec.com",
  "Referer" => "http://www.amano-tec.com/data/download.php",
  "User-Agent" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
})
res = http.request(req)

File.open(FNAME_GEOCODE_ZIP,'w') do |fw|
  fw.write res.body
end

Zip::File.open(FNAME_GEOCODE_ZIP) do |zip|
  zip.each do |entry|
    if "h3010puboffice_utf8.csv" == entry.name
      zip.extract(entry, FNAME_GEOCODE) { true }
    end
  end
end


open('https://www.post.japanpost.jp/zipcode/dl/oogaki/zip/ken_all.zip') do |fr|
  File.open(FNAME_ZIPCODE_ZIP,'w') do |fw|
    fw.write fr.read
  end
end
=end

Zip::File.open(FNAME_ZIPCODE_ZIP) do |zip|
  zip.each do |entry|
    if "KEN_ALL.CSV" == entry.name
      zip.extract(entry, FNAME_ZIPCODE) { true }
    end
  end
end

p "...ZIPCODE scan"
open(FNAME_ZIPCODE) do |f|
  f.read.encode("UTF-8","Shift_JIS").split("\n").each do |line|
    (jiscode, zipcode5, zipcode, ruby1, ruby2, ruby3, prefecture, city, town, is_duplicate_town, is_duplicate_won, has_town_code, has_multi_won, is_news, change_code ) = line.split(/"?,"?/)
    jiszipcode = jiscode + zipcode
    if old = POSTS_JIS_ZIP[jiszipcode]
      if old[4]["（"] && ! old[4]["）"]
        town.gsub!("その他）", "）")
        town.gsub!("（次のビルを除く）","")
        ruby3.gsub!("ｿﾉﾀ\)", ")")
        ruby3.gsub!("(ﾂｷﾞﾉﾋﾞﾙｦﾉｿﾞｸ)","")
        old[4] += town
        old[8] += ruby3
        old[5] = cut(old[4],  /（.*）/,"（）","、", /「.+?を除く」|「.+?」以外/)
        old[9] = cut(old[8], /\(.*\)/,"()","､", /<.+?ｦﾉｿﾞｸ>|<.+?>ｲｶﾞｲ/)
      elsif m = town.match(/^#{old[4]}（(.+)）/)
          mr = ruby3.match(/^#{old[8]}\((.+)\)/)
          old[5] = [*old[5],m[1]].uniq
          old[9] = [*old[9],mr[1]].uniq
      elsif hd = find_header(town, old[4])
        if rubyhd = find_header(ruby3, old[8])
          old[5] = to_etc "（）", *[old[4], *old[5], town].map {|s| s.gsub(hd, "") }
          old[4] = hd
          old[9] = to_etc "()", *[old[8], *old[9], ruby3].map {|s| s.gsub(rubyhd, "") }
          old[8] = rubyhd
        else
          puts [[old[3], old[4], old[8]].join(" "),[city, town, ruby3].join(" ")].join(" - ")
        end
      else
        old[5] = to_etc "（）", old[4], *old[5], town
        old[4] = ""
        old[9] = to_etc "()", old[8], *old[9], ruby3
        old[8] = ""
      end
      next
    end
    if /以下に掲載がない場合|の次に番地がくる場合$/ === town
      town = ruby3 = ""
    end

    town.gsub!("その他）", "）")
    town.gsub!("（次のビルを除く）","")
    ruby3.gsub!("ｿﾉﾀ\)", ")")
    ruby3.gsub!("(ﾂｷﾞﾉﾋﾞﾙｦﾉｿﾞｸ)","")
    etc   = cut(town,  /（.*）/,"（）","、", /「.+?を除く」|「.+?」以外/)
    ruby4 = cut(ruby3, /\(.*\)/,"()","､", /<.+?ｦﾉｿﾞｸ>|<.+?>ｲｶﾞｲ/)
    POSTS_JIS_ZIP[jiszipcode] = POSTS_ZIP[zipcode] = POSTS_JIS[jiscode] = [zipcode, jiscode, prefecture, city, town, etc, ruby1, ruby2, ruby3, ruby4]
    TO_PREFECTURE[city] = TO_PREFECTURE[prefecture] ||= [prefecture, ruby1]
  end
end

p "...ZIPCODE structure"
POSTS_JIS_ZIP.each do |code, data|
  (zipcode, jiscode, prefecture, city, town, etc, ruby1, ruby2, ruby3, ruby4) = data
  puts ORM_CODE[jiscode + zipcode] if ORM_CODE[jiscode + zipcode]

  dic = PAST_DIC[prefecture]['dic'].map{|s| s + '|'}.join("")
  gap = "寺門前|院門前|村|町|市|島|郡|区|）"
  towns = town.split(/(#{dic}.+?(?:区|町|村))/)
  cities = city.split(/(#{dic}.+?(?:#{gap})(?!#{gap}))/)

  name = name_set(
    NAMES,
    prefecture,
  )
  ORM[name]["ruby"] = to_hiragana [ruby1].join("").unicode_normalize(:nfkc) unless ORM[name]["ruby"]

  name = name_set(
    NAMES,
    prefecture,
    *cities,
  )
  ORM[name]["ruby"] = to_hiragana [ruby1,ruby2].join("").unicode_normalize(:nfkc) unless ORM[name]["ruby"]

  name = name_set(
    NAMES,
    prefecture,
    *cities,
    *towns,
  )
  ORM[name]["ruby"] = to_hiragana [ruby1,ruby2,ruby3].join("").unicode_normalize(:nfkc) unless ORM[name]["ruby"]

  case etc.size
  when 0
    ORM[name]["zipcode"] = zipcode
    ORM[name]["jiscode"] = jiscode
    ORM_CODE[jiscode + zipcode] = [ORM[name]]
  else
    etc.each_with_index do |etc_item, idx|
      ruby4_item = ruby4[idx]
      name = name_set(
        NAMES,
        prefecture,
        *cities,
        *towns,
        "（#{etc_item}）"
      )
      ORM[name]["ruby"] = to_hiragana [ruby1,ruby2,ruby3,ruby4_item].join("").unicode_normalize(:nfkc)
    end
    if etc.size == 1
      ORM[name]["zipcode"] = zipcode
      ORM[name]["jiscode"] = jiscode
    end
    ETCS[name] = etc 
  end
end

p "...GEOCODE scan"
open(FNAME_GEOCODE) do |f|
  f.read.encode("UTF-8","UTF-8").split("\n").each do |line|
    ( jiscode, label, ruby, building, zipcode, address, tel, source, lat, lon, note ) = line.split("\t")
    next if 'jiscode' == jiscode
    lat = lat.to_f
    lon = lon.to_f
    jiscode = jiscode.rjust(5,"0")
    zipcode = zipcode.tr("-",'')
    post = POSTS_ZIP[zipcode] || POSTS_JIS[jiscode]
    if post
      (_zipcode, _jiscode, prefecture, city, town, etc, ruby1, ruby2, ruby3, ruby4) = post
      dic = PAST_DIC[prefecture]['dic'].map{|s| s + '|'}.join("")
      gap = "寺門前|院門前|村|町|市|島|郡|区|）"
      towns = town.split(/(#{dic}.+?(?:区|町|村))/)
      cities = city.split(/(#{dic}.+?(?:#{gap})(?!#{gap}))/)
      name = name_set(
        NAME_GEOS,
        prefecture,
        *cities,
        *towns,
      )
      (ORM_CODE[jiscode + zipcode] || []).each do |orm|
        orm["on"] = [lat, lon]
        orm["tel"] = tel
        orm["address"] = address
      end
      ETCS[name] = etc if 0 < etc.size
      kata = [ruby1,ruby2,ruby3].join("").unicode_normalize(:nfkc)
      hira = to_hiragana(kata)
    else
      label_key = TO_PREFECTURE.keys.find {|s| s.start_with? label }
      (prefecture, ruby1) = TO_PREFECTURE[label_key]

      if label == prefecture
        # 都道府県庁の場合
        hira = ruby + "ちょう"
        name = name_set(
          NAME_GEOS,
          prefecture,
          building[-2..]
        )
        ORM[name]["zipcode"] = zipcode
        ORM[name]["jiscode"] = jiscode
        ORM[name]["ruby"] = hira
        ORM[name]["on"] = [lat, lon]
        ORM[name]["tel"] = tel
        ORM[name]["address"] = address
      else
        # 市役所の場合
        ruby1 = ruby1.unicode_normalize(:nfkc)
        ruby1 = to_hiragana(ruby1)
        hira = [ruby1, ruby].join("")
        if building["市役所"]
          name = name_set(
            NAME_GEOS,
            prefecture,
            building.gsub(/役所$/, ""),
            "市役所"
          )
        else
          name = name_set(
            NAME_GEOS,
            prefecture,
            building,
          )
        end
        ORM[name]["zipcode"] = zipcode
        ORM[name]["jiscode"] = jiscode
        ORM[name]["ruby"] = hira
        ORM[name]["on"] = [lat, lon]
        ORM[name]["tel"] = tel
        ORM[name]["address"] = address
      end
      kata = to_katakana(hira)
    end
    GEOS.push({
      "_id" => jiscode,
      "zip" => zipcode,
      "on" => [lat, lon],
      "name" => name,
      "label" => label,
      "hira" => hira,
      "kata" => kata,
      "tel" => tel,
      "address" => address,
    })
  end
end

CHECK_GEOS = {}
geo = {
  "zips" => GEOS,
  "names" => name_reduce!(NAME_GEOS),
  "labels" => label_reduce(NAME_GEOS, CHECK_GEOS).sort.to_h,
}

CHECKS = {}

File.open(FNAME_OUTPUT_YAML,"w") do |f|
  f.write YAML.dump geo
end

DIC.each do |key, dic|
  if 0 < dic['cut'].size
    r = /^(#{dic['cut'].join("|")})../
    dic['dic'].reject! {|s| r === s }
  end
  dic.each do |k, d|
    dic[k] =  d.sort_by {|o| [- o.size, o] }.uniq
  end
  dic.replace dic.sort.to_h
end
File.open(FNAME_SNAP_HD + "dic.yml","w") do |f|
  f.write YAML.dump DIC
end
File.open(FNAME_SNAP_HD + "orm.yml","w") do |f|
  f.write YAML.dump ORM.values.sort_by {|o| o["zipcode"] || "" }
end
File.open(FNAME_SNAP_HD + "etc.yml","w") do |f|
  f.write YAML.dump ETCS
end
File.open(FNAME_SNAP_HD + "name.yml","w") do |f|
  f.write YAML.dump name_reduce!(NAMES)
end
File.open(FNAME_SNAP_HD + "label.yml","w") do |f|
  f.write YAML.dump label_reduce(NAMES, CHECKS).sort.to_h
end

# data structure check.
YAML.load_file(FNAME_OUTPUT_YAML)
YAML.load_file(FNAME_SNAP_HD + "name.yml")
YAML.load_file(FNAME_SNAP_HD + "label.yml")
YAML.load_file(FNAME_SNAP_HD + "etc.yml")
YAML.load_file(FNAME_SNAP_HD + "dic.yml")
YAML.load_file(FNAME_SNAP_HD + "orm.yml")
