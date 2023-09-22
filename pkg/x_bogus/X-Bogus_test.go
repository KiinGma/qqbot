package pkg

import (
	"fmt"
	"github.com/dop251/goja"
	"net/url"
	"testing"
)

//{
//    "url":"https://www.douyin.com/aweme/v1/web/aweme/detail/?aweme_id=7190049956269444386&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333",
//    "user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
//}

var a = `aweme_id=7190049956269444386&aid=1128&version_name=23.5.0&device_platform=android&os_version=2333`
var b = `Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) douyin/2.3.1 Chrome/104.0.5112.102 Electron/20.1.0-tt.4.release.douyin.77 TTElectron/20.1.0-tt.4.release.douyin.77 Safari/537.36 awemePcClient/2.3.1 buildId/10433720 osName/Windows`

func TestXBogus(t *testing.T) {
	// 创建一个新的JavaScript虚拟机
	vm := goja.New()

	// 运行JS文件
	_, err := vm.RunString(s2)

	if err != nil {
		fmt.Println(err)
		return
	}

	// 调用JS函数
	result, err := vm.RunString(fmt.Sprintf(`sign("%v","%v")`, a, b))
	if err != nil {
		fmt.Println(err)
		return
	}

	// 打印结果
	fmt.Println(result)
}

func TestSign(t *testing.T) {
	u, err := url.Parse(`https://www.douyin.com/aweme/v1/web/notice/?device_platform=webapp&aid=6383&channel=channel_pc_web&is_new_notice=1&is_mark_read=1&notice_group=2&count=10&min_time=0&max_time=0&pc_client_type=2&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=104.0.5112.102&browser_online=true&engine_name=Blink&engine_version=104.0.5112.102&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=9.7&effective_type=4g&round_trip_time=0&webid=7233244916146570790`)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(u.Query().Encode())
	Sign(u.Query().Encode(), `Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) douyin/2.3.1 Chrome/104.0.5112.102 Electron/20.1.0-tt.4.release.douyin.77 TTElectron/20.1.0-tt.4.release.douyin.77 Safari/537.36 awemePcClient/2.3.1 buildId/10433720 osName/Windows`)
}
