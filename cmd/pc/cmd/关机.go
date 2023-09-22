package cmd

import (
	"log"
	"os/exec"
)

func ShutdownComputer() {
	cmd := exec.Command("shutdown", "/s", "/t", "0")
	err := cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
}
