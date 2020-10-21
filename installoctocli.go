package main

import (
	"log"
	"os"
	"os/exec"
	"runtime"
)

func main() {
	if runtime.GOOS == "windows" {
		cmd1 := exec.Command("powershell", "-command", "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))")
		cmd2 := exec.Command("choco", "install", "octopustools", "-y")

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

	if runtime.GOOS == "linux" {
		cmd1 := exec.Command("bash", "-c", "sudo apt install --no-install-recommends gnupg curl ca-certificates apt-transport-https")
		cmd2 := exec.Command("bash", "-c", "curl -sSfL https://apt.octopus.com/public.key | sudo apt-key add")
		cmd3 := exec.Command("bash", "-c", "sudo sh -c 'echo deb https://apt.octopus.com/ stable main > /etc/apt/sources.list.d/octopus.com.list'")
		cmd4 := exec.Command("bash", "-c", "sudo apt update")
		cmd5 := exec.Command("bash", "-c", "sudo apt install octopuscli -y")

		cmd1.Stdout = os.Stdout
		cmd1.Stderr = os.Stderr

		cmd2.Stdout = os.Stdout
		cmd2.Stderr = os.Stderr

		cmd3.Stdout = os.Stdout
		cmd3.Stderr = os.Stderr

		cmd4.Stdout = os.Stdout
		cmd4.Stderr = os.Stderr

		cmd5.Stdout = os.Stdout
		cmd5.Stderr = os.Stderr

		err1 := cmd1.Run()
		err2 := cmd2.Run()
		err3 := cmd3.Run()
		err4 := cmd4.Run()
		err5 := cmd5.Run()

		if err1 != nil {
			log.Fatal(err1)
		}

		if err2 != nil {
			log.Fatal(err2)
		}

		if err3 != nil {
			log.Fatal(err3)
		}

		if err4 != nil {
			log.Fatal(err4)
		}

		if err5 != nil {
			log.Fatal(err5)
		}
	}

	if runtime.GOOS == "darwin" {
		cmd1 := exec.Command("bash", "-c", "brew tap octopusdeploy/taps")
		cmd2 := exec.Command("bash", "-c", "brew install octopuscli -f")

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
}
