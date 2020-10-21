package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"runtime"
)

func main() {
	if runtime.GOOS == "windows" {
		install := exec.Command("choco", "install", "octopustools", "-y")

		err := install.Run()

		if err != nil {
			log.Fatal(err)
		}
	}

	if runtime.GOOS == "linux" {
		cmd1 := exec.Command("dotnet", "tool", "install", "--global", "Octopus.DotNet.Cli")
		cmd2 := exec.Command("export", "PATH=$PATH:dotnet-octo")

		cmd1.Stdout = os.Stdout
		cmd1.Stderr = os.Stderr

		cmd2.Stdout = os.Stdout
		cmd2.Stderr = os.Stderr

		err1 := cmd1.Run()
		err2 := cmd2.Run()

		if err1 != nil {
			log.Fatal(err1)
		}

		if err2 != nil {
			log.Fatal(err2)
		}
	}

	if runtime.GOOS == "darwin" {
		cmd := exec.Command("brew", "tap", "octopusdeploy/taps")
		cmd = exec.Command("brew", "install", "octopuscli", "-f")

		checkErr := cmd.Run()

		if checkErr != nil {
			fmt.Println("Confirm that octopuscli is not already installed..")
			fmt.Println(checkErr)
		}
	}
}
