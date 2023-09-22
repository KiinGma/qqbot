package errno

func ChatGptErr(code string) string {
	switch code {
	case "context_length_exceeded":
		return ""
	}
	return ""
}
