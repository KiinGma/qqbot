package logger

import (
	"github.com/labstack/gommon/log"
	"github.com/rs/zerolog"
)

var (
	echoLevels = map[log.Lvl]zerolog.Level{
		log.DEBUG: zerolog.DebugLevel,
		log.INFO:  zerolog.InfoLevel,
		log.WARN:  zerolog.WarnLevel,
		log.ERROR: zerolog.ErrorLevel,
		log.OFF:   zerolog.NoLevel,
	}

	zeroLevels = map[zerolog.Level]log.Lvl{
		zerolog.DebugLevel: log.DEBUG,
		zerolog.InfoLevel:  log.INFO,
		zerolog.WarnLevel:  log.WARN,
		zerolog.ErrorLevel: log.ERROR,
		zerolog.NoLevel:    log.OFF,
	}
)

func MatchEchoLevel(level log.Lvl) (zerolog.Level, log.Lvl) {
	zlvl, found := echoLevels[level]

	if found {
		return zlvl, level
	}

	return zerolog.NoLevel, log.OFF
}

func MatchZeroLevel(level zerolog.Level) (log.Lvl, zerolog.Level) {
	elvl, found := zeroLevels[level]

	if found {
		return elvl, level
	}

	return log.OFF, zerolog.NoLevel
}
