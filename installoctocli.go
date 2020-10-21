package main

import (
	"fmt"
	"log"
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
		install := exec.Command("sudo", "apt", "install", "--no-install-recommends", "gnupg", "curl", "ca-certificates apt-transport-https")
		install = exec.Command("curl", "-sSfL", "https://apt.octopus.com/public.key", "|", "sudo", "apt-key", "add", "-")
		install = exec.Command("sudo", "sh", "-c", "echo deb https://apt.octopus.com/ stable main > /etc/apt/sources.list.d/octopus.com.list")
		install = exec.Command("sudo", "apt", "update", "&&", "sudo", "apt", "install", "octopuscli")

		err := install.Run()

		if err != nil {
			log.Fatal(err)
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
