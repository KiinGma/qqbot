package models

import (
	"encoding/json"
	"github.com/tidwall/gjson"
	"strings"
)

type LOLUser struct {
	Base
	LastGame  string `json:"last_game"`
	Gid       uint64 `json:"gid"`
	Name      string `json:"name"`
	Cookie    string `json:"cookie"`
	AccountId string `json:"accountId"`
	OpenId    string `json:"open_id"`
	Area      int64  `json:"area"`
}

func (i *LOLUser) ToJson() []byte {
	data, _ := json.Marshal(i)
	return data
}

func (i *LOLUser) ToStruct(data []byte) {
	_ = json.Unmarshal(data, i)
}

type LOLChampSearch struct {
	ChampionId   string `json:"champion_id"`
	SearchString string `json:"search_string"`
}
type LOLBattle struct {
	GameId                     string `json:"game_id"`
	GameStartTime              string `json:"game_start_time"`
	GameTimePlayed             int    `json:"game_time_played"`
	MapId                      int    `json:"map_id"`
	GameQueueId                int    `json:"game_queue_id"`
	WasMvp                     int    `json:"was_mvp"`
	WasSvp                     int    `json:"was_svp"`
	WasEarlySurrender          int    `json:"was_early_surrender"`
	PlayGt25Mask               int    `json:"play_gt25_mask"`
	GameServerVersion          string `json:"game_server_version"`
	ChampionId                 int64  `json:"champion_id"`
	Position                   string `json:"position"`
	SkinIndex                  int    `json:"skin_index"`
	GameScore                  int    `json:"game_score"`
	TeamId                     string `json:"team_id"`
	Win                        string `json:"win"`
	Kills                      int    `json:"kills"`
	Deaths                     int    `json:"deaths"`
	Assists                    int    `json:"assists"`
	GoldEarned                 int    `json:"gold_earned"`
	WasSurrender               int    `json:"was_surrender"`
	WasAfk                     int    `json:"was_afk"`
	MostKills                  int    `json:"most_kills"`
	MostAssists                int    `json:"most_assists"`
	MostMinionsKilled          int    `json:"most_minions_killed"`
	MostGoldEarned             int    `json:"most_gold_earned"`
	MostDamageDealtToChampions int    `json:"most_damage_dealt_to_champions"`
	MostTotalDamageTaken       int    `json:"most_total_damage_taken"`
	MostTurretsKilled          int    `json:"most_turrets_killed"`
	DoubleKills                int    `json:"double_kills"`
	TripleKills                int    `json:"triple_kills"`
	QuadraKills                int    `json:"quadra_kills"`
	PentaKills                 int    `json:"penta_kills"`
	UnrealKills                int    `json:"unreal_kills"`
	GameLevel                  string `json:"game_level"`
	WinWithLessTeammate        int    `json:"win_with_less_teammate"`
	TeamMadeSize               int    `json:"team_made_size"`
	BattleType                 int    `json:"battle_type"`
}

func (b *LOLBattle) ToBattles(data []byte) (battles []LOLBattle) {
	err := json.Unmarshal(data, &battles)
	if err != nil {
		return nil
	}
	return
}

type BanInfo struct {
	ChampionId int    `json:"championId"`
	PickTurn   int    `json:"pickTurn"`
	TeamId     string `json:"teamId"`
}

type TeamDetail struct {
	BanInfoList        []BanInfo `json:"banInfoList"`
	IsSurrender        int       `json:"isSurrender"`
	TeamElo            int       `json:"teamElo"`
	TeamId             string    `json:"teamId"`
	TotalAssists       int       `json:"totalAssists"`
	TotalBaronKills    int       `json:"totalBaronKills"`
	TotalBaseKilled    int       `json:"totalBaseKilled"`
	TotalDampenKilled  int       `json:"totalDampenKilled"`
	TotalDeaths        int       `json:"totalDeaths"`
	TotalDragonKills   int       `json:"totalDragonKills"`
	TotalGoldEarned    int       `json:"totalGoldEarned"`
	TotalKills         int       `json:"totalKills"`
	TotalTurretsKilled int       `json:"totalTurretsKilled"`
	Win                string    `json:"win"`
}
type PlayerDetail struct {
	PERK0                     int          `json:"PERK0"`
	PERK1                     int          `json:"PERK1"`
	PERK2                     int          `json:"PERK2"`
	PERK3                     int          `json:"PERK3"`
	PERK4                     int          `json:"PERK4"`
	PERK5                     int          `json:"PERK5"`
	STATPERK0                 int          `json:"STAT_PERK_0"`
	STATPERK1                 int          `json:"STAT_PERK_1"`
	STATPERK2                 int          `json:"STAT_PERK_2"`
	AllMinionsKilled          int          `json:"allMinionsKilled"`
	Assists                   int          `json:"assists"`
	BaronKills                int          `json:"baronKills"`
	BarracksKilled            int          `json:"barracksKilled"`
	BattleHonour              BattleHonour `json:"battleHonour"`
	ChampionId                int64        `json:"championId"`
	ChampionUsedExp           int          `json:"championUsedExp"`
	ChampionsKilled           int          `json:"championsKilled"`
	ConsumablesPurchased      int          `json:"consumablesPurchased"`
	DoubleKills               int          `json:"doubleKills"`
	DragonKills               int          `json:"dragonKills"`
	Exp                       int          `json:"exp"`
	GameScore                 int          `json:"gameScore"`
	GoldEarned                int          `json:"goldEarned"`
	GoldSpent                 int          `json:"goldSpent"`
	HqKilled                  int          `json:"hqKilled"`
	Item0                     int          `json:"item0"`
	Item1                     int          `json:"item1"`
	Item2                     int          `json:"item2"`
	Item3                     int          `json:"item3"`
	Item4                     int          `json:"item4"`
	Item5                     int          `json:"item5"`
	Item6                     int          `json:"item6"`
	ItemsPurchased            int          `json:"itemsPurchased"`
	KeystoneId                int          `json:"keystoneId"`
	KillingSpress             int          `json:"killingSpress"`
	LargestCriticalStrike     int          `json:"largestCriticalStrike"`
	LargestKillingSpree       int          `json:"largestKillingSpree"`
	LargestMultiKill          int          `json:"largestMultiKill"`
	Level                     int          `json:"level"`
	LoginIp                   string       `json:"loginIp"`
	LolId                     string       `json:"lolId"`
	Lpl                       string       `json:"lpl"`
	MagicDamageDealtPlayer    int          `json:"magicDamageDealtPlayer"`
	MagicDamageTaken          int          `json:"magicDamageTaken"`
	MagicDamageToChampions    int          `json:"magicDamageToChampions"`
	MinionsKilled             int          `json:"minionsKilled"`
	Name                      string       `json:"name"`
	NeutralMinionsKilled      int          `json:"neutralMinionsKilled"`
	NumDeaths                 int          `json:"numDeaths"`
	Openid                    string       `json:"openid"`
	PentaKills                int          `json:"pentaKills"`
	PerkStyle                 int          `json:"perkStyle"`
	PerkSubStyle              int          `json:"perkSubStyle"`
	PhysicalDamageDealtPlayer int          `json:"physicalDamageDealtPlayer"`
	PhysicalDamageTaken       int          `json:"physicalDamageTaken"`
	PhysicalDamageToChampions int          `json:"physicalDamageToChampions"`
	Position                  string       `json:"position"`
	PuuId                     string       `json:"puuId"`
	QuadraKills               int          `json:"quadraKills"`
	SightWardsBoughtInGame    int          `json:"sightWardsBoughtInGame"`
	SkinIndex                 int          `json:"skinIndex"`
	Spell1Cast                int          `json:"spell1Cast"`
	Spell2Cast                int          `json:"spell2Cast"`
	Spell3Cast                int          `json:"spell3Cast"`
	Spell4Cast                int          `json:"spell4Cast"`
	SummonSpell1Cast          int          `json:"summonSpell1Cast"`
	SummonSpell1Id            int          `json:"summonSpell1Id"`
	SummonSpell2Cast          int          `json:"summonSpell2Cast"`
	SummonSpell2Id            int          `json:"summonSpell2Id"`
	TeamId                    string       `json:"teamId"`
	TeamMadeSize              int          `json:"teamMadeSize"`
	TimeCcingOthers           int          `json:"timeCcingOthers"`
	TotalDamageDealt          int          `json:"totalDamageDealt"`
	TotalDamageTaken          int          `json:"totalDamageTaken"`
	TotalDamageToChampions    int          `json:"totalDamageToChampions"`
	TotalHealth               int          `json:"totalHealth"`
	TotalTimeSpentDead        int          `json:"totalTimeSpentDead"`
	TripleKills               int          `json:"tripleKills"`
	TrueDemageToChampions     int          `json:"trueDemageToChampions"`
	TurretsKilled             int          `json:"turretsKilled"`
	UinId                     string       `json:"uinId"`
	UnrealKills               int          `json:"unrealKills"`
	VisionScore               int          `json:"visionScore"`
	VisionWardsBoughtInGame   int          `json:"visionWardsBoughtInGame"`
	WardKilled                int          `json:"wardKilled"`
	WardPlaced                int          `json:"wardPlaced"`
	WardPlacedDetector        int          `json:"wardPlacedDetector"`
	WardSkinIndex             int          `json:"wardSkinIndex"`
	WasAfk                    int          `json:"wasAfk"`
	Win                       string       `json:"win"`
	BalanceScore              int
}

type BattleHonour struct {
	GameLevel                            string `json:"gameLevel"`
	IsDoubleKills                        int    `json:"isDoubleKills"`
	IsGodlike                            int    `json:"isGodlike"`
	IsLargestAllMinionsKilled            int    `json:"isLargestAllMinionsKilled"`
	IsLargestAssists                     int    `json:"isLargestAssists"`
	IsLargestChampionsKilled             int    `json:"isLargestChampionsKilled"`
	IsLargestGoldEarned                  int    `json:"isLargestGoldEarned"`
	IsLargestTotalDamageDealtToChampions int    `json:"isLargestTotalDamageDealtToChampions"`
	IsLargestTotalDamageTaken            int    `json:"isLargestTotalDamageTaken"`
	IsLargestTurretsKilled               int    `json:"isLargestTurretsKilled"`
	IsMvp                                int    `json:"isMvp"`
	IsPentaKills                         int    `json:"isPentaKills"`
	IsQuadraKills                        int    `json:"isQuadraKills"`
	IsSvp                                int    `json:"isSvp"`
	IsTripleKills                        int    `json:"isTripleKills"`
	IsUnrealKills                        int    `json:"isUnrealKills"`
	IsWinWithLessTeammate                int    `json:"isWinWithLessTeammate"`
	IsZeroDeath                          int    `json:"isZeroDeath"`
}

type BattleDetail struct {
	AreaId            string         `json:"area_id"`
	GameId            string         `json:"game_id"`
	GameStartTime     string         `json:"game_start_time"`
	GameTimePlayed    int            `json:"game_time_played"`
	MapId             int            `json:"map_id"`
	GameQueueId       int            `json:"game_queue_id"`
	GameMode          string         `json:"game_mode"`
	GameType          string         `json:"game_type"`
	PlatformId        string         `json:"platform_id"`
	WasEarlySurrender int            `json:"was_early_surrender"`
	PlayGt25Mask      int            `json:"play_gt25_mask"`
	GameServerVersion string         `json:"game_server_version"`
	TeamDetails       []TeamDetail   `json:"team_details"`
	PlayerDetails     []PlayerDetail `json:"player_details"`
}

func (bd *BattleDetail) ToStruct(data []byte) {
	json.Unmarshal(data, bd)
}

//

type GameLevel struct {
	Tier         string `json:"tier"`
	LeaguePoints string `json:"league_points"`
	Rank         string `json:"rank"`
}

//原始game level参数转成struct

func (g *GameLevel) ToStruct(data string) {
	//原始的数据包含了斜杠要格式化
	data = strings.ReplaceAll(data, `""`, `"`)
	g.Tier = gjson.Get(data, "tier").String()
	g.Rank = gjson.Get(data, "rank").String()
	g.LeaguePoints = gjson.Get(data, "league_points").String()
}
