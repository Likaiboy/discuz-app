var subpages = ['tab-webview-subpage-main.html', 'forum-list.html', 'tab-webview-subpage-message.html', 'tab-webview-subpage-aboutMe.html'];
			var subpage_style = {
				top: '46px',
				bottom: '50px'
			};
			 //mui.init();
			 //创建子页面，首个选项卡页面显示，其它均隐藏；
			mui.plusReady(function() {
				if (mui.os.android) {
					plus.screen.lockOrientation("portrait-primary");
				}
				main = plus.webview.currentWebview();
				var self = plus.webview.currentWebview();
				for (var i = 0; i < 4; i++) {
					var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if (i > 0) {
						sub.hide();
					}
					self.append(sub);
				}
			});
			 //当前激活选项
			var activeTab = subpages[0];
			var title = document.getElementById("title");
			 //选项卡点击事件
			mui('.mui-bar-tab').on('tap', 'a', function(e) {
				var targetTab = this.getAttribute('href');
				if (targetTab == activeTab) {
					return;
				}
				//更换标题
				title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
				//显示目标选项卡
				plus.webview.show(targetTab);
				//隐藏当前;
				plus.webview.hide(activeTab);
				//更改当前活跃的选项卡
				activeTab = targetTab;
			});
			 //自定义事件，模拟点击“首页选项卡”
			document.addEventListener('gohome', function() {
				var defaultTab = document.getElementById("defaultTab");
				//模拟首页点击
				mui.trigger(defaultTab, 'tap');
				//切换选项卡高亮
				var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
				if (defaultTab !== current) {
					current.classList.remove('mui-active');
					defaultTab.classList.add('mui-active');
				}
			});
			
			
			//发表帖子点击事件
			document.getElementById("compose").addEventListener('tap', function() {
				mui.openWindow({
					url: "new-post.html"
				});
			});
			
			 //首页返回键处理
			 //处理逻辑：1秒内，连续两次按返回键，则退出应用；
			var first = null;
			mui.back = function() {
				//首次按键，提示‘再按一次退出应用’
				if (!first) {
					first = new Date().getTime();
					mui.toast('再按一次退出应用');
					setTimeout(function() {
						first = null;
					}, 1000);
				} else {
					if (new Date().getTime() - first < 1000) {
						plus.runtime.quit();
					}
				}
			};