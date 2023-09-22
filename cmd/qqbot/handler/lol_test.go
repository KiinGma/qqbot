package handler

import (
	"fmt"
	"github.com/tidwall/gjson"
	"kiingma/cmd/qqbot/models"
	"strings"
	"testing"
)

func TestGameLevel(t *testing.T) {
	d := `{
            "game_id": "7811735571",
            "game_start_time": "1679838543525",
            "game_time_played": 1792,
            "map_id": 11,
            "game_queue_id": 440,
            "was_mvp": 0,
            "was_svp": 0,
            "was_early_surrender": 0,
            "play_gt25_mask": 1,
            "game_server_version": "",
            "champion_id": 200,
            "position": "JUNGLE",
            "skin_index": 0,
            "game_score": 105776,
            "team_id": "200",
            "win": "Win",
            "kills": 10,
            "deaths": 6,
            "assists": 18,
            "gold_earned": 15014,
            "was_surrender": 0,
            "was_afk": 0,
            "most_kills": 0,
            "most_assists": 0,
            "most_minions_killed": 0,
            "most_gold_earned": 0,
            "most_damage_dealt_to_champions": 0,
            "most_total_damage_taken": 0,
            "most_turrets_killed": 1,
            "double_kills": 0,
            "triple_kills": 0,
            "quadra_kills": 0,
            "penta_kills": 0,
            "unreal_kills": 0,
            "game_level": "{\"tier\":\"2\",\"league_points\":\"94\",\"rank\":\"0\"}",
            "win_with_less_teammate": 0,
            "team_made_size": 5,
            "battle_type": 0
        }`
	j := gjson.Get(d, "game_level")
	j2 := strings.ReplaceAll(j.String(), `""`, `"`)
	j3 := gjson.Get(j2, "league_points")
	fmt.Println(j3)
}

// 100 点黑铁四
// 200 点黑铁三
// 300 点黑铁二
// 400 点黑铁一
// 500 点白银四
// 600 点白银三
func TestGetRanksPoints(t *testing.T) {

	g := models.GameLevel{"5", "100", "0"}
	fmt.Println(GetRanksPoints(g))
}
