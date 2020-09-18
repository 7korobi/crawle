export interface ChrsetsYAML {
    chr_set: ChrSet;
    chr_npc: ChrNpc[];
    chr_job: ChrJob[];
}

export interface ChrJob {
    face_id:  string;
    job:      string;
    comment?: string;
}

export interface ChrNpc {
    label:   string;
    csid:    string;
    face_id: string;
    say_0:   string;
    say_1:   string;
    _id?:    string;
}

export interface ChrSet {
    _id:   string;
    admin: string;
    maker: string;
    label: string;
}

export interface ChrFaceYml {
    _id:      string;
    name:     string;
    comment?: null | string;
    order:    number;
    tag_ids:  string[];
}

export interface ChrTagYml {
    label:      string;
    long:       string;
    tag_id?:    TagID;
    chr_set_id: string;
    face_sort:  FaceSort[];
    order:      number;
    _id:        string;
    head?:      Head;
}

export enum FaceSort {
    Asc = "asc",
    FaceOrder = "face.order",
    FaceQHead = "face.q.head",
}

export enum Head {
    人狼議事テーマ別 = "人狼議事-テーマ別",
    人狼議事年齢別 = "人狼議事-年齢別",
    帰還者議事テーマ別 = "帰還者議事-テーマ別",
}

export enum TagID {
    All = "all",
    Giji = "giji",
    Travel = "travel",
}

export interface Index {
    stories: StoryElement[];
    faces:   Face[];
}

export interface Face {
    _id:       ID;
    date_min:  Date;
    date_max:  Date;
    story_ids: string[];
}

export interface ID {
    face_id: string;
}

export interface StoryElement {
    _id:             string;
    _type:           StoryType;
    card:            Card;
    folder:          Folder;
    is_epilogue:     boolean;
    is_finish:       boolean;
    name:            string;
    options:         Option[];
    rating:          null | string;
    sow_auth_id:     string;
    timer:           StoryTimer;
    type:            TypeClass;
    upd:             StoryUpd;
    vid:             number;
    vpl:             number[];
    is_full_commit?: boolean;
    comment?:        string;
}

export enum StoryType {
    SowVillage = "SowVillage",
}

export interface Card {
    discard: Array<number | string>;
    event:   string[];
    config:  USERIDADMINElement[];
}

export enum USERIDADMINElement {
    Admin = "admin",
    Alchemist = "alchemist",
    Alive = "alive",
    Aprilfool = "aprilfool",
    Aura = "aura",
    Aurawolf = "aurawolf",
    Bat = "bat",
    Bind = "bind",
    Bitch = "bitch",
    Childwolf = "childwolf",
    Clamor = "clamor",
    Cointoss = "cointoss",
    Cpossess = "cpossess",
    Curse = "curse",
    Cursed = "cursed",
    Cursewolf = "cursewolf",
    Cwolf = "cwolf",
    Decide = "decide",
    Dipsy = "dipsy",
    Dish = "dish",
    Doctor = "doctor",
    Droop = "droop",
    Dying = "dying",
    Dyingpixi = "dyingpixi",
    Dyingpossess = "dyingpossess",
    Dyingwolf = "dyingwolf",
    Eclipse = "eclipse",
    Elder = "elder",
    Entry = "entry",
    Epilogue = "epilogue",
    Escape = "escape",
    Executed = "executed",
    Fairy = "fairy",
    Fan = "fan",
    Fanatic = "fanatic",
    Feared = "feared",
    Fink = "fink",
    Fire = "fire",
    Fm = "fm",
    Follow = "follow",
    Force = "force",
    Gamemaster = "gamemaster",
    Ghost = "ghost",
    Girl = "girl",
    Glass = "glass",
    Grave = "grave",
    Guard = "guard",
    Guru = "guru",
    Hamster = "hamster",
    Hate = "hate",
    Hatedevil = "hatedevil",
    Headless = "headless",
    Hide = "hide",
    Hunter = "hunter",
    Intwolf = "intwolf",
    Invalid = "invalid",
    Jammer = "jammer",
    Juror = "juror",
    Leave = "leave",
    Live = "live",
    Lonewolf = "lonewolf",
    Lost = "lost",
    Love = "love",
    Loveangel = "loveangel",
    Lover = "lover",
    Main = "main",
    Master = "master",
    Medium = "medium",
    Mediumrole = "mediumrole",
    Mediumwin = "mediumwin",
    Memo = "memo",
    Mimicry = "mimicry",
    Miracle = "miracle",
    Mob = "mob",
    Muppeting = "muppeting",
    Necromancer = "necromancer",
    Nightmare = "nightmare",
    None = "none",
    Nothing = "nothing",
    Ogre = "ogre",
    Oracle = "oracle",
    Oura = "oura",
    Passion = "passion",
    Possess = "possess",
    Prince = "prince",
    Prologue = "prologue",
    Prophecy = "prophecy",
    Rightwolf = "rightwolf",
    Robber = "robber",
    Scapegoat = "scapegoat",
    Seance = "seance",
    Seer = "seer",
    Seeronce = "seeronce",
    Seerrole = "seerrole",
    Seerwin = "seerwin",
    Semiwolf = "semiwolf",
    Shield = "shield",
    Silentwolf = "silentwolf",
    Snatch = "snatch",
    Sorcerer = "sorcerer",
    Start = "start",
    Stigma = "stigma",
    Suddendead = "suddendead",
    Suicide = "suicide",
    Sympathy = "sympathy",
    Tangle = "tangle",
    Trickster = "trickster",
    Turnfairy = "turnfairy",
    Turnfink = "turnfink",
    Victim = "victim",
    Villager = "villager",
    Visiter = "visiter",
    Walpurgis = "walpurgis",
    Werebat = "werebat",
    Weredog = "weredog",
    Whitewolf = "whitewolf",
    Wisper = "wisper",
    Witch = "witch",
    Wolf = "wolf",
}

export enum Folder {
    Allstar = "ALLSTAR",
    Braid = "BRAID",
    Cabala = "CABALA",
    Ciel = "CIEL",
    Crazy = "CRAZY",
    Lobby = "LOBBY",
    LobbyOld = "LOBBY_OLD",
    Morphe = "MORPHE",
    Offparty = "OFFPARTY",
    Pan = "PAN",
    Perjury = "PERJURY",
    PerjuryOld = "PERJURY_OLD",
    Pretense = "PRETENSE",
    Rp = "RP",
    Soybean = "SOYBEAN",
    Test = "TEST",
    Ultimate = "ULTIMATE",
    Union = "UNION",
    Wolf = "WOLF",
    Xebec = "XEBEC",
}

export enum Option {
    AimingTalk = "aiming-talk",
    Entrust = "entrust",
    RandomTarget = "random-target",
    SelectRole = "select-role",
    SeqEvent = "seq-event",
    UndeadTalk = "undead-talk",
}

export interface StoryTimer {
    updateddt:    Date;
    nextupdatedt: Date;
    nextchargedt: Date;
    nextcommitdt: Date;
    scraplimitdt: Date;
}

export interface TypeClass {
    say:       SayElement;
    vote:      Vote;
    roletable: Roletable;
    mob:       USERIDADMINElement | null;
    game:      Game | null;
}

export enum Game {
    LiveMillerhollow = "LIVE_MILLERHOLLOW",
    LiveTabula = "LIVE_TABULA",
    Millerhollow = "MILLERHOLLOW",
    Mistery = "MISTERY",
    Secret = "SECRET",
    Tabula = "TABULA",
    Trouble = "TROUBLE",
}

export enum Roletable {
    Custom = "custom",
    Default = "default",
    Hamster = "hamster",
    Lover = "lover",
    Mistery = "mistery",
    Random = "random",
    Test1St = "test1st",
    Test2Nd = "test2nd",
    Ultimate = "ultimate",
    WbbsC = "wbbs_c",
    WbbsF = "wbbs_f",
    WbbsG = "wbbs_g",
}

export enum SayElement {
    Euro = "euro",
    Infinity = "infinity",
    InfinityBraid = "infinity_braid",
    Juna = "juna",
    JunaBraid = "juna_braid",
    Lobby = "lobby",
    Saving = "saving",
    Say1 = "say1",
    Say5 = "say5",
    Say5X200 = "say5x200",
    Say5X300 = "say5x300",
    Sow = "sow",
    Tiny = "tiny",
    Vulcan = "vulcan",
    VulcanBraid = "vulcan_braid",
    Wbbs = "wbbs",
    Weak = "weak",
    WeakBraid = "weak_braid",
}

export enum Vote {
    Anonymity = "anonymity",
    Sign = "sign",
}

export interface StoryUpd {
    interval: number;
    hour:     number;
    minute:   number;
}

export interface Plan {
    plans: PlanElement[];
}

export interface PlanElement {
    _id:      string;
    link:     string;
    title:    string;
    write_at: Date;
    name:     string;
    state:    null | string;
    chip:     null | string;
    sign:     null | string;
    card:     string[];
    upd:      PlanUpd;
    lock:     any[];
    flavor:   string[];
    options:  string[];
    tags:     Array<string[]>;
}

export interface PlanUpd {
    description: null;
    time:        null | string;
    interval:    null | string;
    prologue:    null;
    start:       null | string;
}

export interface RandomYml {
    tarot:     { [key: string]: Tarot };
    zodiac:    { [key: string]: Zodiac };
    Ptolemaic: { [key: string]: Bayer };
    Lacaille:  { [key: string]: Bayer };
    Bayer:     { [key: string]: Bayer };
    Plancius:  Plancius;
    Hevelius:  Hevelius;
    planet:    { [key: string]: Planet };
    chess:     { [key: string]: Chess };
    weather:   { [key: string]: Chess };
    coin:      Coin;
    eto10:     Eto10;
    eto12:     Eto12;
}

export interface Bayer {
    types: TypeElement[];
    label: string;
    ratio: number;
}

export enum TypeElement {
    Iau = "IAU",
}

export interface Hevelius {
    "Canes Venatici": Bayer;
    Lacerta:          Bayer;
    "Leo Minor":      Bayer;
    Lynx:             Bayer;
    Scutum:           Bayer;
    Sextans:          Bayer;
    Vulpecula:        Bayer;
}

export interface Plancius {
    Camelopardalis: Bayer;
    Columba:        Bayer;
    Crux:           Bayer;
    Monoceros:      Bayer;
}

export interface Chess {
    ratio:  number;
    symbol: string;
    label:  string;
}

export interface Coin {
    front: Back;
    back:  Back;
    stand: Back;
}

export interface Back {
    ratio: number;
    label: string;
}

export interface Eto10 {
    甲: 丁;
    乙: 丁;
    丙: 丁;
    丁: 丁;
    戊: 丁;
    己: 丁;
    庚: 丁;
    辛: 丁;
    壬: 丁;
    癸: 丁;
}

export interface 丁 {
    name: string;
}

export interface Eto12 {
    子: 丁;
    丑: 丁;
    寅: 丁;
    卯: 丁;
    辰: 丁;
    巳: 丁;
    午: 丁;
    未: 丁;
    申: 丁;
    酉: 丁;
    戌: 丁;
    亥: 丁;
}

export interface Planet {
    symbol: string;
    label:  string;
}

export interface Tarot {
    name:   string;
    label:  string;
    hebrew: string;
}

export interface Zodiac {
    types:  TypeElement[];
    symbol: string;
    label:  string;
    hebrew: string;
    ratio?: number;
    name?:  string;
}

export interface RuleYml {
    nation:  Maker;
    village: Maker;
    maker:   Maker;
    player:  Maker;
}

export interface Maker {
    head: string;
    list: List[];
}

export interface List {
    head: string;
    log:  string;
}

export interface SetAblesYml {
    group?:   Group;
    at?:      string;
    cmd?:     string;
    btn?:     string;
    change?:  string;
    help:     null | string;
    _id:      string;
    sw?:      string;
    pass?:    string;
    for?:     string;
    targets?: string;
    target?:  string;
    require?: string;
    label?:   string;
    hide?:    string[];
    disable?: string[];
    text?:    Text[];
}

export enum Group {
    Gm = "GM",
    Potof = "POTOF",
    Status = "STATUS",
}

export enum Text {
    Act = "act",
    Memo = "memo",
    Talk = "talk",
}

export interface SetActionsYml {
    index?:  number;
    text:    string;
    target?: boolean;
}

export interface SetEventsYml {
    label: string;
    _id:   USERIDADMINElement;
}

export interface SetLocaleYml {
    sow_locale_id?: SowLocaleID;
    label:          string;
    _id:            string;
    help?:          string;
    intro?:         string[];
}

export enum SowLocaleID {
    All = "all",
    Complexx = "complexx",
    Heavy = "heavy",
    Millerhollow = "millerhollow",
    Regend = "regend",
    Secret = "secret",
    Sow = "sow",
    Star = "star",
    Tabula = "tabula",
    Ultimate = "ultimate",
}

export interface SetMarkYml {
    label?:  string;
    path:    string;
    _id:     string;
    enable?: boolean;
}

export interface SowRoletablesYml {
    label:          string;
    help?:          string;
    _id:            string;
    cmd?:           SetOptionYmlCmd | null;
    disabled?:      boolean;
    role_ids_list?: Array<USERIDADMINElement[] | null>;
}

export enum SetOptionYmlCmd {
    Trap = "trap",
}

export interface SetRolesYml {
    label:    string;
    win:      null | string;
    able_ids: string[];
    help?:    string;
    _id:      USERIDADMINElement;
    group?:   null | string;
    able?:    string;
    cmd?:     SetRolesYmlCmd;
}

export enum SetRolesYmlCmd {
    Role = "role",
}

export interface SetSaysYml {
    label:     string;
    help?:     string;
    count?:    { [key: string]: number };
    max?:      Max;
    recovery?: string;
    _id:       SayElement;
    all?:      { [key: string]: number };
    disabled?: boolean;
}

export interface Max {
    size: number;
    word: number;
    line: number;
}

export interface SetWinnerYml {
    label:        string;
    group:        string;
    order:        number;
    help?:        string;
    _id:          string;
    label_human?: string;
}

export interface SowFolderYml {
    config?:   Config;
    _id:       string;
    story?:    SowFolderYmlStory;
    nation?:   string;
    folder?:   Folder;
    vid_code?: string;
    server?:   string;
    oldlog?:   string;
    livelog?:  string;
    info_url?: string;
    epi_url?:  string;
}

export interface Config {
    csid?:       string[];
    path?:       Path;
    enable?:     Enable;
    trsid?:      SowLocaleID[];
    game?:       Game[];
    erb?:        Erb;
    cd_default?: CDDefault;
    maxsize?:    Maxsize;
    saycnt?:     SayElement[];
    cfg?:        CFG;
    pl?:         string;
    is_angular?: string;
}

export enum CDDefault {
    戦 = "戦",
    演 = "演",
}

export interface CFG {
    TYPE:            Type;
    RULE:            Folder;
    USERID_NPC:      USERIDADMINElement;
    USERID_ADMIN:    USERIDADMINElement;
    ENABLED_VMAKE:   number;
    TIMEOUT_ENTRY:   number;
    TIMEOUT_SCRAP:   number;
    TOPPAGE_INFO:    ToppageInfo;
    BASEDIR_CGI:     BasedirCGI;
    BASEDIR_DAT:     BasedirDAT;
    BASEDIR_DOC:     string;
    URL_SW?:         string;
    BASEDIR_CGIERR?: string;
    NAME_HOME?:      string;
    MAX_VILLAGES?:   number;
    MAX_LOG?:        number;
}

export enum BasedirCGI {
    Empty = ".",
}

export enum BasedirDAT {
    Data = "./data",
}

export enum ToppageInfo {
    InfoPl = "./_info.pl",
    SowInfoPl = "../sow/_info.pl",
}

export enum Type {
    Braid = "BRAID",
    Cabala = "CABALA",
    Cheat = "CHEAT",
}

export interface Enable {
    DEFAULT_VOTETYPE:     DefaultVotetype[];
    ENABLED_DELETED:      Array<ENABLEDDELETEDEnum | number>;
    ENABLED_WINNER_LABEL: Array<ENABLEDWINNERLABELEnum | number>;
    ENABLED_MAX_ESAY:     Array<ENABLEDMAXESAYEnum | number>;
    ENABLED_RANDOMTARGET: Array<ENABLEDRANDOMTARGETEnum | number>;
    ENABLED_SUDDENDEATH:  Array<ENABLEDSUDDENDEATHEnum | number>;
    ENABLED_BITTY:        Array<ENABLEDBITTYEnum | number>;
    ENABLED_PERMIT_DEAD:  Array<ENABLEDPERMITDEADEnum | number>;
    ENABLED_UNDEAD:       Array<ENABLEDUNDEADEnum | number>;
    ENABLED_AIMING:       Array<ENABLEDAIMINGEnum | number>;
    ENABLED_MOB_AIMING:   Array<ENABLEDMOBAIMINGEnum | number>;
    ENABLED_AMBIDEXTER:   Array<ENABLEDAMBIDEXTEREnum | number>;
    ENABLED_SUICIDE_VOTE: Array<ENABLEDSUICIDEVOTEEnum | number>;
    ENABLED_SEQ_EVENT?:   Array<number | string>;
    ENABLED_TEST_ROLE?:   Array<number | string>;
}

export enum DefaultVotetype {
    Anonymity = "anonymity",
    標準の投票方法Sign記名Anonymity無記名 = "標準の投票方法(sign: 記名、anonymity:無記名)",
}

export enum ENABLEDAIMINGEnum {
    The1対象を指定した発言内緒話を含める = "1:対象を指定した発言（内緒話）を含める",
}

export enum ENABLEDAMBIDEXTEREnum {
    The1狂人の裏切りを認める狂人は人狼陣営ではなく裏切りの陣営村が負ければよい = "1:狂人の裏切りを認める（狂人は、人狼陣営ではなく裏切りの陣営＝村が負ければよい）",
}

export enum ENABLEDBITTYEnum {
    少女や交霊者ののぞきみがひらがなのみ = "少女や交霊者ののぞきみがひらがなのみ。",
}

export enum ENABLEDDELETEDEnum {
    削除発言を表示するかどうか = "削除発言を表示するかどうか",
}

export enum ENABLEDMAXESAYEnum {
    エピローグを発言制限対象に0しない1する = "エピローグを発言制限対象に 0:しない、1:する",
}

export enum ENABLEDMOBAIMINGEnum {
    The1見物人が内緒話を使える = "1:見物人が内緒話を使える。",
}

export enum ENABLEDPERMITDEADEnum {
    墓下の人狼共鳴者コウモリ人間が囁きを見られるかどうか = "墓下の人狼/共鳴者/コウモリ人間が囁きを見られるかどうか",
}

export enum ENABLEDRANDOMTARGETEnum {
    The1投票・能力先にランダムを含める = "1:投票・能力先に「ランダム」を含める",
}

export enum ENABLEDSUDDENDEATHEnum {
    The1突然死あり = "1:突然死あり",
}

export enum ENABLEDSUICIDEVOTEEnum {
    The1自殺投票 = "1:自殺投票",
}

export enum ENABLEDUNDEADEnum {
    The1幽界トーク村を設定可能 = "1:幽界トーク村を設定可能",
}

export enum ENABLEDWINNERLABELEnum {
    The1勝利者表示をする = "1:勝利者表示をする。",
}

export enum Erb {
    AssetSowGijiPlErb = "./asset/sow/giji.pl.erb",
    AssetSowPanPlErb = "./asset/sow/pan.pl.erb",
}

export interface Maxsize {
    MAXSIZE_ACTION:   number;
    MAXSIZE_MEMOCNT:  number;
    MAXSIZE_MEMOLINE: number;
}

export interface Path {
    DIR_LIB:  DirLIB;
    DIR_HTML: DirHTML;
    DIR_RS:   DirRs;
    DIR_VIL:  DirVil;
    DIR_USER: DirUser;
}

export enum DirHTML {
    CabalaHTML = "../cabala/html",
    HTML = "./html",
    TestbedHTML = "../testbed/html",
}

export enum DirLIB {
    CabalaLIB = "../cabala/lib",
    LIB = "./lib",
    TestbedLIB = "../testbed/lib",
}

export enum DirRs {
    CabalaRs = "../cabala/rs",
    Rs = "./rs",
    TestbedRs = "../testbed/rs",
}

export enum DirUser {
    DIRUSERDataUser = "../data/user",
    DataUser = "./data/user",
    SowDataUser = "../sow/data/user",
}

export enum DirVil {
    CafeDataVil = "../cafe/data/vil",
    DataVil = "./data/vil",
    JksyDataVil = "../jksy/data/vil",
}

export interface SowFolderYmlStory {
    evil:      Evil;
    role_play: boolean;
}

export enum Evil {
    Evil = "EVIL",
    Wolf = "WOLF",
}

export interface Villages {
    stories:   StoryElement[];
    messages?: Message[];
    events:    Event[];
    potofs?:   Potof[];
}

export interface Event {
    _id:        EventIDEnum;
    _type:      EventType;
    name?:      Name;
    story_id:   StoryID;
    turn:       number;
    winner:     Winner;
    created_at: Date;
    updated_at: Date;
    eclipse?:   string[];
    epilogue?:  number;
    grudge?:    number;
    riot?:      number;
    say?:       Say;
    scapegoat?: number;
    seance?:    string[];
    event?:     null;
}

export enum EventIDEnum {
    Cabala2310 = "cabala-231-0",
    Cabala2311 = "cabala-231-1",
    Cabala2312 = "cabala-231-2",
    Cabala2313 = "cabala-231-3",
    Cabala2314 = "cabala-231-4",
    Cabala2315 = "cabala-231-5",
    Cabala2316 = "cabala-231-6",
    Cabala440 = "cabala-44-0",
    Cabala441 = "cabala-44-1",
    Cabala442 = "cabala-44-2",
    Cabala443 = "cabala-44-3",
    Cabala444 = "cabala-44-4",
    Cabala445 = "cabala-44-5",
    Cabala446 = "cabala-44-6",
    Ciel10 = "ciel-1-0",
    Ciel11 = "ciel-1-1",
    Ciel12 = "ciel-1-2",
    Ciel13 = "ciel-1-3",
    Ciel14 = "ciel-1-4",
    Ciel15 = "ciel-1-5",
    Ciel16 = "ciel-1-6",
    Ciel190 = "ciel-19-0",
    Ciel191 = "ciel-19-1",
    Ciel192 = "ciel-19-2",
    Ciel193 = "ciel-19-3",
    Ciel194 = "ciel-19-4",
    Ciel620 = "ciel-62-0",
    Ciel621 = "ciel-62-1",
    Ciel622 = "ciel-62-2",
    Ciel623 = "ciel-62-3",
    Ciel624 = "ciel-62-4",
    Ciel625 = "ciel-62-5",
    Ciel626 = "ciel-62-6",
    Ciel627 = "ciel-62-7",
    Ciel628 = "ciel-62-8",
    Ciel640 = "ciel-64-0",
    Ciel641 = "ciel-64-1",
    Ciel642 = "ciel-64-2",
    Ciel643 = "ciel-64-3",
    Ciel644 = "ciel-64-4",
    Ciel645 = "ciel-64-5",
    Crazy2710 = "crazy-271-0",
    Crazy2711 = "crazy-271-1",
    Crazy2712 = "crazy-271-2",
    Crazy2713 = "crazy-271-3",
    Offparty20 = "offparty-2-0",
    Offparty21 = "offparty-2-1",
    Rp330 = "rp-33-0",
    Rp331 = "rp-33-1",
    Rp3310 = "rp-33-10",
    Rp3311 = "rp-33-11",
    Rp3312 = "rp-33-12",
    Rp3313 = "rp-33-13",
    Rp332 = "rp-33-2",
    Rp333 = "rp-33-3",
    Rp334 = "rp-33-4",
    Rp335 = "rp-33-5",
    Rp336 = "rp-33-6",
    Rp337 = "rp-33-7",
    Rp338 = "rp-33-8",
    Rp339 = "rp-33-9",
    Ultimate690 = "ultimate-69-0",
    Ultimate691 = "ultimate-69-1",
    Ultimate692 = "ultimate-69-2",
    Ultimate693 = "ultimate-69-3",
    Ultimate694 = "ultimate-69-4",
    Ultimate695 = "ultimate-69-5",
    Ultimate696 = "ultimate-69-6",
    Wolf1160 = "wolf-116-0",
    Wolf1161 = "wolf-116-1",
    Wolf11610 = "wolf-116-10",
    Wolf1162 = "wolf-116-2",
    Wolf1163 = "wolf-116-3",
    Wolf1164 = "wolf-116-4",
    Wolf1165 = "wolf-116-5",
    Wolf1166 = "wolf-116-6",
    Wolf1167 = "wolf-116-7",
    Wolf1168 = "wolf-116-8",
    Wolf1169 = "wolf-116-9",
    Xebec2750 = "xebec-275-0",
    Xebec2751 = "xebec-275-1",
    Xebec2752 = "xebec-275-2",
    Xebec2753 = "xebec-275-3",
    Xebec2754 = "xebec-275-4",
    Xebec2755 = "xebec-275-5",
    Xebec2756 = "xebec-275-6",
    Xebec2830 = "xebec-283-0",
    Xebec2831 = "xebec-283-1",
    Xebec2832 = "xebec-283-2",
    Xebec2833 = "xebec-283-3",
    Xebec2834 = "xebec-283-4",
    Xebec2835 = "xebec-283-5",
    Xebec2836 = "xebec-283-6",
    Xebec2837 = "xebec-283-7",
    Xebec2838 = "xebec-283-8",
    Xebec2950 = "xebec-295-0",
    Xebec2951 = "xebec-295-1",
    Xebec2952 = "xebec-295-2",
    Xebec2953 = "xebec-295-3",
    Xebec2954 = "xebec-295-4",
    Xebec2955 = "xebec-295-5",
    Xebec2956 = "xebec-295-6",
    Xebec3030 = "xebec-303-0",
    Xebec3031 = "xebec-303-1",
    Xebec3032 = "xebec-303-2",
    Xebec3033 = "xebec-303-3",
    Xebec3034 = "xebec-303-4",
    Xebec3035 = "xebec-303-5",
    Xebec3036 = "xebec-303-6",
    Xebec3037 = "xebec-303-7",
    Xebec3038 = "xebec-303-8",
}

export enum EventType {
    SowTurn = "SowTurn",
}

export enum Name {
    エピローグ = "エピローグ",
    プロローグ = "プロローグ",
}

export interface Say {
    modifiedsay:   Date;
    modifiedwsay:  Date;
    modifiedgsay:  Date;
    modifiedspsay: Date;
    modifiedxsay:  Date;
    modifiedvsay?: Date;
}

export enum StoryID {
    Cabala231 = "cabala-231",
    Cabala44 = "cabala-44",
    Ciel1 = "ciel-1",
    Ciel19 = "ciel-19",
    Ciel62 = "ciel-62",
    Ciel64 = "ciel-64",
    Crazy271 = "crazy-271",
    Offparty2 = "offparty-2",
    Rp33 = "rp-33",
    Ultimate69 = "ultimate-69",
    Wolf116 = "wolf-116",
    Xebec275 = "xebec-275",
    Xebec283 = "xebec-283",
    Xebec295 = "xebec-295",
    Xebec303 = "xebec-303",
}

export enum Winner {
    WinHuman = "WIN_HUMAN",
    WinNone = "WIN_NONE",
    WinPixi = "WIN_PIXI",
    WinWolf = "WIN_WOLF",
}

export interface Message {
    _id:         string;
    story_id:    StoryID;
    event_id:    EventIDEnum | null;
    logid:       string;
    sow_auth_id: string;
    date:        Date;
    log:         null | string;
    subid:       Subid;
    face_id:     FaceID | null;
    csid:        Csid | null;
    style:       Style | null;
    mestype:     Mestype;
    name:        string;
    size?:       number;
    to?:         To;
}

export enum Csid {
    All = "all",
    Animal = "animal",
    Changed = "changed",
    Ririnra = "ririnra",
    RirinraC20 = "ririnra_c20",
    RirinraC51 = "ririnra_c51",
    RirinraC67 = "ririnra_c67",
    School = "school",
    Time = "time",
    TimeT21 = "time_t21",
    TimeT44 = "time_t44",
    TimeT48 = "time_t48",
    TimeT48Wash = "time_t48_wash",
    TimeT49 = "time_t49",
    TimeT49Wash = "time_t49_wash",
    Wa = "wa",
}

export enum FaceID {
    Admin = "admin",
    All = "all",
    B44 = "b44",
    B49 = "b49",
    C01 = "c01",
    C02 = "c02",
    C03 = "c03",
    C04 = "c04",
    C05 = "c05",
    C06 = "c06",
    C07 = "c07",
    C08 = "c08",
    C09 = "c09",
    C10 = "c10",
    C101 = "c101",
    C104 = "c104",
    C105 = "c105",
    C11 = "c11",
    C110 = "c110",
    C112 = "c112",
    C119 = "c119",
    C12 = "c12",
    C122 = "c122",
    C123 = "c123",
    C124 = "c124",
    C125 = "c125",
    C127 = "c127",
    C129 = "c129",
    C13 = "c13",
    C130 = "c130",
    C135 = "c135",
    C136 = "c136",
    C138 = "c138",
    C139 = "c139",
    C14 = "c14",
    C15 = "c15",
    C16 = "c16",
    C18 = "c18",
    C19 = "c19",
    C20 = "c20",
    C21 = "c21",
    C22 = "c22",
    C23 = "c23",
    C24 = "c24",
    C25 = "c25",
    C26 = "c26",
    C27 = "c27",
    C28 = "c28",
    C29 = "c29",
    C30 = "c30",
    C31 = "c31",
    C32 = "c32",
    C33 = "c33",
    C34 = "c34",
    C35 = "c35",
    C36 = "c36",
    C37 = "c37",
    C38 = "c38",
    C39 = "c39",
    C40 = "c40",
    C41 = "c41",
    C42 = "c42",
    C43 = "c43",
    C44 = "c44",
    C45 = "c45",
    C46 = "c46",
    C47 = "c47",
    C48 = "c48",
    C49 = "c49",
    C50 = "c50",
    C51 = "c51",
    C52 = "c52",
    C53 = "c53",
    C54 = "c54",
    C55 = "c55",
    C57 = "c57",
    C58 = "c58",
    C59 = "c59",
    C60 = "c60",
    C62 = "c62",
    C63 = "c63",
    C64 = "c64",
    C65 = "c65",
    C66 = "c66",
    C67 = "c67",
    C68 = "c68",
    C70 = "c70",
    C71 = "c71",
    C72 = "c72",
    C73 = "c73",
    C76 = "c76",
    C79 = "c79",
    C80 = "c80",
    C81 = "c81",
    C85 = "c85",
    C87 = "c87",
    C99 = "c99",
    F000 = "f000",
    F15 = "f15",
    F18 = "f18",
    F2 = "f2",
    F20 = "f20",
    F21 = "f21",
    F23 = "f23",
    F25 = "f25",
    F26 = "f26",
    F27 = "f27",
    F28 = "f28",
    F5 = "f5",
    F8 = "f8",
    F9 = "f9",
    Fw01 = "fw01",
    Fw02 = "fw02",
    G04 = "g04",
    G07 = "g07",
    G09 = "g09",
    M04 = "m04",
    M06 = "m06",
    M09 = "m09",
    M14 = "m14",
    M16 = "m16",
    M19 = "m19",
    M20 = "m20",
    Mad01 = "mad01",
    Mad02 = "mad02",
    Mad03 = "mad03",
    Mad04 = "mad04",
    Mad06 = "mad06",
    Mad09 = "mad09",
    Maker = "maker",
    Sf026 = "sf026",
    Sf033 = "sf033",
    Sf035 = "sf035",
    Sf039 = "sf039",
    Sf04 = "sf04",
    Sf10 = "sf10",
    Sf16 = "sf16",
    Sf17 = "sf17",
    T01 = "t01",
    T02 = "t02",
    T03 = "t03",
    T06 = "t06",
    T08 = "t08",
    T10 = "t10",
    T11 = "t11",
    T12 = "t12",
    T14 = "t14",
    T15 = "t15",
    T17 = "t17",
    T20 = "t20",
    T24 = "t24",
    T28 = "t28",
    T34 = "t34",
    T41 = "t41",
    T42 = "t42",
    T43 = "t43",
    T44 = "t44",
    T45 = "t45",
    T47 = "t47",
    T49 = "t49",
    T50 = "t50",
    T51 = "t51",
    T53 = "t53",
    T54 = "t54",
    T55 = "t55",
    T56 = "t56",
    T58 = "t58",
    T59 = "t59",
    T63 = "t63",
    T65 = "t65",
    T66 = "t66",
    T69 = "t69",
    T70 = "t70",
    T72 = "t72",
    T73 = "t73",
    T74 = "t74",
    T75 = "t75",
    T76 = "t76",
    T86 = "t86",
    T87 = "t87",
    T89 = "t89",
    T90 = "t90",
    T93 = "t93",
    T99 = "t99",
    W03 = "w03",
    W04 = "w04",
    W05 = "w05",
    W06 = "w06",
    W07 = "w07",
    W08 = "w08",
    W10 = "w10",
    W11 = "w11",
    W12 = "w12",
    W13 = "w13",
    W15 = "w15",
    W17 = "w17",
    W20 = "w20",
    W24 = "w24",
    W26 = "w26",
    W27 = "w27",
    W29 = "w29",
    W31 = "w31",
    W35 = "w35",
    W37 = "w37",
    W38 = "w38",
    W39 = "w39",
    W40 = "w40",
    W45 = "w45",
    W52 = "w52",
    W53 = "w53",
}

export enum Mestype {
    Admin = "ADMIN",
    Aim = "AIM",
    Bsay = "BSAY",
    Cast = "CAST",
    Deleted = "DELETED",
    Gsay = "GSAY",
    Infonom = "INFONOM",
    Infosp = "INFOSP",
    Infowolf = "INFOWOLF",
    Maker = "MAKER",
    Msay = "MSAY",
    Say = "SAY",
    Spsay = "SPSAY",
    Tsay = "TSAY",
    Vsay = "VSAY",
    Wsay = "WSAY",
    Xsay = "XSAY",
}

export enum Style {
    Head = "head",
    Mono = "mono",
}

export enum Subid {
    A = "A",
    B = "B",
    I = "I",
    M = "M",
    S = "S",
}

export enum To {
    FSM団ミナカタ = "FSM団 ミナカタ",
    Mi18エリ = "MI:18 エリ",
    R団タカモト = "R団 タカモト",
    いしくボリス = "いしく ボリス",
    おひめさまタルト = "おひめさま タルト",
    お使いハナ = "お使い ハナ",
    お散歩隊長アシモフ = "お散歩隊長 アシモフ",
    かみさまRパルック1 = "かみさま R-パルック-1",
    かみさまパルック = "かみさま パルック",
    げぼくショコラ = "げぼく ショコラ",
    こあくとうドナルド = "こあくとう ドナルド",
    すくみずアオイ = "すくみず アオイ",
    りゅうきへいアーサー = "りゅうきへい アーサー",
    ラプターニジノ = "ラプター ニジノ",
    七星拳ナツミ = "七星拳 ナツミ",
    人工知能研DRコトリン = "人工知能研 Dr.コトリン",
    会堂長老会ワタル = "会堂長老会 ワタル",
    保安技師ナユタ = "保安技師 ナユタ",
    公安部カガ = "公安部 カガ",
    刻字座ヴェルヌイユ = "刻字座 ヴェルヌイユ",
    剪毛工レナータ = "剪毛工 レナータ",
    厭世家サイモン = "厭世家 サイモン",
    双子夕顔 = "双子 夕顔",
    双子朝顔 = "双子 朝顔",
    双生児オスカー = "双生児 オスカー",
    双生児ホリー = "双生児 ホリー",
    営利政府トレイル = "営利政府 トレイル",
    団子屋たまこ = "団子屋 たまこ",
    地下鉄道フランク = "地下鉄道 フランク",
    墓守ヨーランダ = "墓守 ヨーランダ",
    奴隷運びヌヴィル = "奴隷運び ヌヴィル",
    子守り日向 = "子守り 日向",
    宝珠コーラ = "宝珠 コーラ",
    小娘ゾーイ = "小娘 ゾーイ",
    少年探偵団ガーディ = "少年探偵団 ガーディ",
    幸運の科学リッキィ = "幸運の科学 リッキィ",
    幽閉児ジャック = "幽閉児 ジャック",
    店番ソフィア = "店番 ソフィア",
    弁務官ジャーディン = "弁務官 ジャーディン",
    憑依呪術師ケトゥートゥ = "憑依呪術師 ケトゥートゥ",
    掃除夫ラルフ = "掃除夫 ラルフ",
    教え子シメオン = "教え子 シメオン",
    明仄暁星クロエ = "明仄∴暁星 クロエ",
    時間貯蓄銀行ヤカモト = "時間貯蓄銀行 ヤカモト",
    更なる前進ココア = "更なる前進 ココア",
    朝茶会ソウスケ = "朝茶会 ソウスケ",
    本屋ベネット = "本屋 ベネット",
    架空惑星レン = "架空惑星 レン",
    樫の樹の子らリツ = "樫の樹の子ら リツ",
    歌舞伎座キランディ = "歌舞伎座 キランディ",
    死ね死ね団サミュエル = "死ね死ね団 サミュエル",
    水商売ローズマリー = "水商売 ローズマリー",
    流浪者ペラジー = "流浪者 ペラジー",
    漂白工ピッパ = "漂白工 ピッパ",
    炉の番チトフ = "炉の番 チトフ",
    猫の集会クシャミ = "猫の集会 クシャミ",
    珊瑚宮連邦ルリ = "珊瑚宮連邦 ルリ",
    留守番ジョージ = "留守番 ジョージ",
    病人エリアス = "病人 エリアス",
    病人キャサリン = "病人 キャサリン",
    聖歌隊員レティーシャ = "聖歌隊員 レティーシャ",
    良家の末娘ポーチュラカ = "良家の末娘 ポーチュラカ",
    若者テッド = "若者 テッド",
    薔薇十字ススム = "薔薇∴十字 ススム",
    薬屋サイラス = "薬屋 サイラス",
    蝋燭職人フェルゼ = "蝋燭職人 フェルゼ",
    蟻塚崩しエルゴット = "蟻塚崩し エルゴット",
    覆面嫉妬団ミルフィ = "覆面嫉妬団 ミルフィ",
    親方ダン = "親方 ダン",
    記者イアン = "記者 イアン",
    読書家ケイト = "読書家 ケイト",
    辣醤醸造ガルム = "辣醤醸造 ガルム",
    迷い人ヘザー = "迷い人 ヘザー",
    酸味探しドリベル = "酸味探し ドリベル",
    鉄血の福音セイカ = "鉄血の福音 セイカ",
    長老の孫マーゴ = "長老の孫 マーゴ",
    門下生一平太 = "門下生 一平太",
    隣席座りカナビス = "隣席座り カナビス",
    雲水ハロ = "雲水 ハロ",
    露店巡りシーシャ = "露店巡り シーシャ",
    青い鳥デメテル = "青い鳥 デメテル",
    靴磨きトニー = "靴磨き トニー",
    飾り職ミッシェル = "飾り職 ミッシェル",
    鳥使いフィリップ = "鳥使い フィリップ",
    鷹の爪団マドカ = "鷹の爪団 マドカ",
}

export interface Potof {
    _id:         string;
    _type:       PotofType;
    bonds:       string[];
    clearance?:  number;
    csid:        Csid;
    deathday:    number;
    event_id:    EventID;
    face_id:     FaceID;
    history:     null | string;
    jobname:     null;
    live:        USERIDADMINElement;
    name?:       string;
    overhear:    any[];
    pno?:        null;
    point:       Point;
    pseudobonds: string[];
    role:        Array<USERIDADMINElement | null>;
    rolestate?:  number | null;
    say:         { [key: string]: number | null };
    select:      USERIDADMINElement | number | null;
    sow_auth_id: string;
    story_id:    StoryID;
    timer:       PotofTimer;
    zapcount?:   number;
    pseudolove?: USERIDADMINElement | null;
    love?:       USERIDADMINElement | null;
    commit?:     boolean;
    sheep?:      null | string;
}

export enum PotofType {
    SowUser = "SowUser",
}

export enum EventID {
    Cabala2316 = "cabala-231-6",
    Cabala446 = "cabala-44-6",
    Ciel16 = "ciel-1-6",
    Ciel195 = "ciel-19-5",
    Ciel629 = "ciel-62-9",
    Ciel646 = "ciel-64-6",
    Crazy2710 = "crazy-271-0",
    Crazy2714 = "crazy-271-4",
    Offparty21 = "offparty-2-1",
    Rp339 = "rp-33-9",
    Ultimate696 = "ultimate-69-6",
    Wolf1169 = "wolf-116-9",
    Xebec2757 = "xebec-275-7",
    Xebec2839 = "xebec-283-9",
    Xebec2957 = "xebec-295-7",
    Xebec3039 = "xebec-303-9",
}

export interface Point {
    actaddpt:  number;
    saidcount: number;
    saidpoint: number;
}

export interface PotofTimer {
    entrieddt:    Date;
    limitentrydt: Date;
}
