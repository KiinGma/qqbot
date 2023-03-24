package alipay_pkg

import (
	"github.com/smartwalle/alipay/v3"
	"reflect"
	"testing"
)

func TestGetAlipayClient(t *testing.T) {
	tests := []struct {
		name string
		want *alipay.Client
	}{
		// TODO: Add test cases.
		{"name", GetAlipayClient()},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := GetAlipayClient(); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("GetAlipayClient() = %v, want %v", got, tt.want)
			}
		})
	}
}
