var lineSize = 4;
var maxSize = lineSize*lineSize;
var markOnBgcolor = "#6699FF";
var markOffBgcolor = "#FFFFFF";
var flgPanelArray;
var patternNo = 1;
var clearCountArray = [100,50,40,30,20,4,6];
var count = 0;

$(document).ready(function(){
	setStagePanelPattern(patternNo);
	for(var i = 0 ; i < maxSize ; i++){
		$("#" + i).click(function(event){
			var id =  parseInt($(this).attr("id"), 10);
			var wkId = id + 1;
			if(wkId%lineSize != 1 && checkOffPanel(id-1)){
				// 1つ手前が空きなら入れ替え
				changePanel((id-1), id);
			}else if(wkId%lineSize != 0 && checkOffPanel(id+1)){
				// 1つ先が空きなら入れ替え
				changePanel((id+1), id);
			}else if(wkId-lineSize > 0 && checkOffPanel(id-lineSize)){
				// 上が空きなら入れ替え
				changePanel((id-lineSize), id);
			}else if(wkId+lineSize <= maxSize && checkOffPanel(id+lineSize)){
				// 下が空きなら入れ替え
				changePanel((id+lineSize), id);
			}else{
				// 入れ替え無しの場合はカウントしないのでいったん減らす
				count--;
			}
			$("#count").text(++count);
			// 目標カウント以内に全パネルが並んだら終了
			if(checkAllPanel() && count <= clearCountArray[patternNo-1]) stageClear();
			else if(count >= clearCountArray[patternNo-1]) resetStage();
		});
	}
	// パネルを入れ替える
	function changePanel(i, j){
		var value = flgPanelArray[i];
		flgPanelArray[i] = flgPanelArray[j];
		flgPanelArray[j] = value;
		setPanel(i);
		setPanel(j);
	}
	// パネルの表示をセットする（16だけ白にする）
	function setPanel(i){
		var text = flgPanelArray[i];
		if(text == 16){
			$('#' + i).css("background-color", markOffBgcolor);
		}else{
			$('#' + i).css("background-color", markOnBgcolor);
		}
		$('#' + i).val(text);
	}
	// すべてのパネル1〜順番になったかチェックする
	function checkAllPanel(){
		for(var i = 0 ; i < maxSize ; i++){
			if(!checkPanel(i)) return false;
		}
		return true;
	}
	function checkPanel(i){
		if(flgPanelArray[i] == (i+1)) return true;
		return false;
	}
	// 空きパネルかどうかをチェックする
	function checkOffPanel(i){
		if(flgPanelArray[i] == 16) return true;
		return false;
	}
	// クリアのメッセージを表示する
	function stageClear(){
		alert("ステージクリア！");
		patternNo++;
		setStagePanelPattern();
	}
	function resetStage(){
		alert("残念！やりなおし。");
		setStagePanelPattern();
	}
	// パネルの状態をリセットする
	function setAllPanel(){
		for(var i = 0 ; i < maxSize ; i++){
			setPanel(i);
		}
	}
	// ステージごとのパネルの表示パターン
	function setStagePanelPattern(){
		switch (patternNo){
			case 1:
				flgPanelArray = [1,2,3,4,
				        5,6,7,8,
				        9,10,11,12,
				        13,14,15,16];
				break;
			default:
				alert("ゲームクリアー！");
				patternNo = 1;
				setStagePanelPattern(patternNo);
				return ;
		}
		setAllPanel();
		count = 0;
		$("#clear-count").text(clearCountArray[patternNo-1]);
		$("#count").text(count);
	}
});