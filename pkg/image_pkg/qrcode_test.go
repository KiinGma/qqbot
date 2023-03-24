package image_pkg

import "testing"

func TestGetQRCoreToBase64(t *testing.T) {
	s := QRCoreToBase64("123")
	Base64ToImage(s)
	t.Logf(s)
}
