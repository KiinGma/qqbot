package models

import "encoding/json"

type LOLUser struct {
	Base
	LastGame  string `json:"last_game"`
	Gid       uint64 `json:"gid"`
	Name      string `json:"name"`
	Cookie    string `json:"cookie"`
	AccountId string `json:"accountId"`
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

type Participant struct {
	OriginalAccountId  int64  `json:"originalAccountId"`
	OriginalPlatformId string `json:"originalPlatformId"`
	CurrentAccountId   int64  `json:"currentAccountId"`
	CurrentPlatformId  string `json:"currentPlatformId"`
	TeamId             int    `json:"teamId"`
	Spell1Id           int    `json:"spell1Id"`
	Spell2Id           int    `json:"spell2Id"`
	ChampionId         int    `json:"championId"`
	SkinIndex          int    `json:"skinIndex"`
	ProfileIconId      int    `json:"profileIconId"`
	SummonerName       string `json:"summonerName"`
	TeamParticipantId  int    `json:"teamParticipantId"`
	QueueRating        int    `json:"queueRating"`
	Stats              struct {
		Win                             string `json:"win"`
		Winner                          bool   `json:"winner"`
		Leaver                          bool   `json:"leaver"`
		TimePlayed                      int    `json:"timePlayed"`
		TotalTimeSpentDisconnected      int    `json:"totalTimeSpentDisconnected"`
		ChampLevel                      int    `json:"champLevel"`
		Item0                           int    `json:"item0"`
		Item1                           int    `json:"item1"`
		Item2                           int    `json:"item2"`
		Item3                           int    `json:"item3"`
		Item4                           int    `json:"item4"`
		Item5                           int    `json:"item5"`
		Item6                           int    `json:"item6"`
		Kills                           int    `json:"kills"`
		DoubleKills                     int    `json:"doubleKills"`
		TripleKills                     int    `json:"tripleKills"`
		QuadraKills                     int    `json:"quadraKills"`
		PentaKills                      int    `json:"pentaKills"`
		UnrealKills                     int    `json:"unrealKills"`
		LargestKillingSpree             int    `json:"largestKillingSpree"`
		LargestMultiKill                int    `json:"largestMultiKill"`
		KillingSprees                   int    `json:"killingSprees"`
		LongestTimeSpentLiving          int    `json:"longestTimeSpentLiving"`
		Deaths                          int    `json:"deaths"`
		TotalTimeSpentDead              int    `json:"totalTimeSpentDead"`
		Assists                         int    `json:"assists"`
		TotalDamageDealt                int    `json:"totalDamageDealt"`
		TotalDamageTaken                int    `json:"totalDamageTaken"`
		LargestCriticalStrike           int    `json:"largestCriticalStrike"`
		TotalHeal                       int    `json:"totalHeal"`
		DamageSelfMitigated             int    `json:"damageSelfMitigated"`
		DamageDealtToObjectives         int    `json:"damageDealtToObjectives"`
		DamageDealtToTurrets            int    `json:"damageDealtToTurrets"`
		VisionScore                     int    `json:"visionScore"`
		TimeCCingOthers                 int    `json:"timeCCingOthers"`
		TotalTimeCrowdControlDealt      int    `json:"totalTimeCrowdControlDealt"`
		TotalUnitsHealed                int    `json:"totalUnitsHealed"`
		MinionsKilled                   int    `json:"minionsKilled"`
		NeutralMinionsKilled            int    `json:"neutralMinionsKilled"`
		NeutralMinionsKilledTeamJungle  int    `json:"neutralMinionsKilledTeamJungle"`
		NeutralMinionsKilledEnemyJungle int    `json:"neutralMinionsKilledEnemyJungle"`
		GoldEarned                      int    `json:"goldEarned"`
		GoldSpent                       int    `json:"goldSpent"`
		CombatPlayerScore               int    `json:"combatPlayerScore"`
		ObjectivePlayerScore            int    `json:"objectivePlayerScore"`
		PlayerScore0                    int    `json:"playerScore0"`
		PlayerScore1                    int    `json:"playerScore1"`
		PlayerScore2                    int    `json:"playerScore2"`
		PlayerScore3                    int    `json:"playerScore3"`
		PlayerScore4                    int    `json:"playerScore4"`
		PlayerScore5                    int    `json:"playerScore5"`
		PlayerScore6                    int    `json:"playerScore6"`
		PlayerScore7                    int    `json:"playerScore7"`
		PlayerScore8                    int    `json:"playerScore8"`
		PlayerScore9                    int    `json:"playerScore9"`
		PlayerScore10                   int    `json:"playerScore10"`
		PlayerScore11                   int    `json:"playerScore11"`
		TotalPlayerScore                int    `json:"totalPlayerScore"`
		TotalScoreRank                  int    `json:"totalScoreRank"`
		NodeCapture                     int    `json:"nodeCapture"`
		NodeCaptureAssist               int    `json:"nodeCaptureAssist"`
		NodeNeutralize                  int    `json:"nodeNeutralize"`
		NodeNeutralizeAssist            int    `json:"nodeNeutralizeAssist"`
		TeamObjective                   int    `json:"teamObjective"`
		MagicDamageDealtToChampions     int    `json:"magicDamageDealtToChampions"`
		PhysicalDamageDealtToChampions  int    `json:"physicalDamageDealtToChampions"`
		TrueDamageDealtToChampions      int    `json:"trueDamageDealtToChampions"`
		TotalDamageDealtToChampions     int    `json:"totalDamageDealtToChampions"`
		VisionWardsBoughtInGame         int    `json:"visionWardsBoughtInGame"`
		SightWardsBoughtInGame          int    `json:"sightWardsBoughtInGame"`
		WardsPlaced                     int    `json:"wardsPlaced"`
		WardsKilled                     int    `json:"wardsKilled"`
		MagicDamageDealt                int    `json:"magicDamageDealt"`
		PhysicalDamageDealt             int    `json:"physicalDamageDealt"`
		TrueDamageDealt                 int    `json:"trueDamageDealt"`
		MagicDamageTaken                int    `json:"magicDamageTaken"`
		PhysicalDamageTaken             int    `json:"physicalDamageTaken"`
		TrueDamageTaken                 int    `json:"trueDamageTaken"`
		FirstBloodKill                  bool   `json:"firstBloodKill"`
		FirstBloodAssist                bool   `json:"firstBloodAssist"`
		FirstTowerKill                  bool   `json:"firstTowerKill"`
		FirstTowerAssist                bool   `json:"firstTowerAssist"`
		FirstInhibitorKill              bool   `json:"firstInhibitorKill"`
		FirstInhibitorAssist            bool   `json:"firstInhibitorAssist"`
		WasAfk                          bool   `json:"wasAfk"`
		WasAfkAfterFailedSurrender      bool   `json:"wasAfkAfterFailedSurrender"`
		InhibitorKills                  int    `json:"inhibitorKills"`
		TowerKills                      int    `json:"towerKills"`
		GameEndedInEarlySurrender       bool   `json:"gameEndedInEarlySurrender"`
		GameEndedInSurrender            bool   `json:"gameEndedInSurrender"`
		CausedEarlySurrender            bool   `json:"causedEarlySurrender"`
		EarlySurrenderAccomplice        bool   `json:"earlySurrenderAccomplice"`
		TeamEarlySurrendered            bool   `json:"teamEarlySurrendered"`
		ChampionTransform               int    `json:"championTransform"`
		Spell1Casts                     int    `json:"spell1Casts"`
		Spell2Casts                     int    `json:"spell2Casts"`
		Spell3Casts                     int    `json:"spell3Casts"`
		Spell4Casts                     int    `json:"spell4Casts"`
		Summoner1Casts                  int    `json:"summoner1Casts"`
		Summoner2Casts                  int    `json:"summoner2Casts"`
		Perk0                           int    `json:"perk0"`
		Perk0Var1                       int    `json:"perk0Var1"`
		Perk0Var2                       int    `json:"perk0Var2"`
		Perk0Var3                       int    `json:"perk0Var3"`
		Perk1                           int    `json:"perk1"`
		Perk1Var1                       int    `json:"perk1Var1"`
		Perk1Var2                       int    `json:"perk1Var2"`
		Perk1Var3                       int    `json:"perk1Var3"`
		Perk2                           int    `json:"perk2"`
		Perk2Var1                       int    `json:"perk2Var1"`
		Perk2Var2                       int    `json:"perk2Var2"`
		Perk2Var3                       int    `json:"perk2Var3"`
		Perk3                           int    `json:"perk3"`
		Perk3Var1                       int    `json:"perk3Var1"`
		Perk3Var2                       int    `json:"perk3Var2"`
		Perk3Var3                       int    `json:"perk3Var3"`
		Perk4                           int    `json:"perk4"`
		Perk4Var1                       int    `json:"perk4Var1"`
		Perk4Var2                       int    `json:"perk4Var2"`
		Perk4Var3                       int    `json:"perk4Var3"`
		Perk5                           int    `json:"perk5"`
		Perk5Var1                       int    `json:"perk5Var1"`
		Perk5Var2                       int    `json:"perk5Var2"`
		Perk5Var3                       int    `json:"perk5Var3"`
		PerkPrimaryStyle                int    `json:"perkPrimaryStyle"`
		PerkSubStyle                    int    `json:"perkSubStyle"`
		ChampionMissionStat0            int    `json:"championMissionStat0"`
		ChampionMissionStat1            int    `json:"championMissionStat1"`
		ChampionMissionStat2            int    `json:"championMissionStat2"`
		ChampionMissionStat3            int    `json:"championMissionStat3"`
		TotalHealsOnTeammates           int    `json:"totalHealsOnTeammates"`
		TotalDamageShieldedOnTeammates  int    `json:"totalDamageShieldedOnTeammates"`
		TeamPosition                    string `json:"teamPosition"`
		IndividualPosition              string `json:"individualPosition"`
		StatPerk0                       int    `json:"statPerk0"`
		StatPerk1                       int    `json:"statPerk1"`
		StatPerk2                       int    `json:"statPerk2"`
	} `json:"stats"`
	TimeAddedToQueue int64  `json:"timeAddedToQueue"`
	SummonerId       int64  `json:"summonerId"`
	WardSkin         int    `json:"wardSkin"`
	ParticipantId    int    `json:"participantId"`
	PartnerId        string `json:"partnerId"`
	ObfuscatedIP     string `json:"obfuscatedIP"`
	SummonerLevel    int    `json:"summonerLevel"`
}
