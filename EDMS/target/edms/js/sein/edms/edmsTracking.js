$(document).ready(function() {
	if($('#check').val() == "1"){
		var bbb = "";
		if($('#iphangDay').val() == undefined){
			bbb = "0"; // 미처리
			$('#notForm #edmsStatus', parent.document).val(bbb);
		}else if($('#banipDay').val() == undefined && $('#iphangDay').val() != ""){
			bbb = "0"; // 미처리
			$('#notForm #edmsStatus', parent.document).val(bbb);
			$('#notForm #iphangDay', parent.document).val($('#iphangDay').val());
		}else if($('#singoDay').val() == undefined && $('#banipDay').val() != ""){
			bbb = "1"; // 반입
			$('#notForm #edmsStatus', parent.document).val(bbb);
			$('#notForm #iphangDay', parent.document).val($('#iphangDay').val());
			$('#notForm #banipDay', parent.document).val($('#banipDay').val());
		}else if($('#suriDay').val() == undefined && $('#singoDay').val() != ""){
			bbb = "2"; // 신고
			$('#notForm #edmsStatus', parent.document).val(bbb);
			$('#notForm #singoNum', parent.document).val($('#singoNum1').val());
			$('#notForm #iphangDay', parent.document).val($('#iphangDay').val());
			$('#notForm #banipDay', parent.document).val($('#banipDay').val());
			$('#notForm #singoDay', parent.document).val($('#singoDay').val());
		}else if($('#banchulDay').val() == undefined && $('#suriDay').val() != ""){
			bbb = "3"; // 수리
			$('#notForm #edmsStatus', parent.document).val(bbb);
			$('#notForm #singoNum', parent.document).val($('#singoNum2').val());
			$('#notForm #iphangDay', parent.document).val($('#iphangDay').val());
			$('#notForm #banipDay', parent.document).val($('#banipDay').val());
			$('#notForm #singoDay', parent.document).val($('#singoDay').val());
			$('#notForm #suriDay', parent.document).val($('#suriDay').val());
		}else if($('#banchulDay').val() != ""){
			bbb = "4"; // 완료
			$('#notForm #edmsStatus', parent.document).val(bbb);
			$('#notForm #singoNum', parent.document).val($('#singoNum3').val());
			$('#notForm #iphangDay', parent.document).val($('#iphangDay').val());
			$('#notForm #banipDay', parent.document).val($('#banipDay').val());
			$('#notForm #singoDay', parent.document).val($('#singoDay').val());
			$('#notForm #suriDay', parent.document).val($('#suriDay').val());
			$('#notForm #banchulDay', parent.document).val($('#banchulDay').val());
		}

		$('#status').val("");
		$('#iphangDay').val("");
		$('#banipDay').val("");
		$('#singoDay').val("");
		$('#suriDay').val("");
		$('#banchulDay').val("");
		$('#singoNum1').val("");
		$('#singoNum2').val("");
		$('#singoNum3').val("");
	}else{
		if($('#status').val() != undefined){
			var bbb = "";
			if($('#iphangDay').val() == undefined){
				bbb = "0"; // 미처리
				$('#changeForm #edmsStatus', parent.document).val(bbb);
			}else if($('#banipDay').val() == undefined && $('#iphangDay').val() != ""){
				bbb = "0"; // 미처리
				$('#changeForm #edmsStatus', parent.document).val(bbb);
				$('#changeForm #iphangDay', parent.document).val($('#iphangDay').val());
			}else if($('#suriDay').val() == undefined && $('#banipDay').val() != ""){
				if($('#singoDay').val() == undefined){
					bbb = "1"; // 반입
					$('#changeForm #edmsStatus', parent.document).val(bbb);
					$('#changeForm #iphangDay', parent.document).val($('#iphangDay').val());
					$('#changeForm #banipDay', parent.document).val($('#banipDay').val());
				}else{
					bbb = "2"; // 신고
					$('#changeForm #edmsStatus', parent.document).val(bbb);
					$('#changeForm #singoNum', parent.document).val($('#singoNum1').val());
					$('#changeForm #iphangDay', parent.document).val($('#iphangDay').val());
					$('#changeForm #banipDay', parent.document).val($('#banipDay').val());
					$('#changeForm #singoDay', parent.document).val($('#singoDay').val());
				}
			}else if($('#suriDay').val() == undefined && $('#singoDay').val() != ""){
				if($('#banipDay').val() == undefined){
					bbb = "2"; // 신고
					$('#changeForm #edmsStatus', parent.document).val(bbb);
					$('#changeForm #singoNum', parent.document).val($('#singoNum1').val());
					$('#changeForm #iphangDay', parent.document).val($('#iphangDay').val());
					$('#changeForm #singoDay', parent.document).val($('#singoDay').val());
				}else{
					bbb = "1"; // 반입
					$('#changeForm #edmsStatus', parent.document).val(bbb);
					$('#changeForm #iphangDay', parent.document).val($('#iphangDay').val());
					$('#changeForm #banipDay', parent.document).val($('#banipDay').val());
					$('#changeForm #singoDay', parent.document).val($('#singoDay').val());
				}
			}else if($('#banchulDay').val() == undefined && $('#suriDay').val() != ""){
				bbb = "3"; // 수리
				$('#changeForm #edmsStatus', parent.document).val(bbb);
				$('#changeForm #singoNum', parent.document).val($('#singoNum2').val());
				$('#changeForm #iphangDay', parent.document).val($('#iphangDay').val());
				$('#changeForm #banipDay', parent.document).val($('#banipDay').val());
				$('#changeForm #singoDay', parent.document).val($('#singoDay').val());
				$('#changeForm #suriDay', parent.document).val($('#suriDay').val());
			}else if($('#banchulDay').val() != ""){
				bbb = "4"; // 완료
				$('#changeForm #edmsStatus', parent.document).val(bbb);
				$('#changeForm #singoNum', parent.document).val($('#singoNum3').val());
				$('#changeForm #iphangDay', parent.document).val($('#iphangDay').val());
				$('#changeForm #banipDay', parent.document).val($('#banipDay').val());
				$('#changeForm #singoDay', parent.document).val($('#singoDay').val());
				$('#changeForm #suriDay', parent.document).val($('#suriDay').val());
				$('#changeForm #banchulDay', parent.document).val($('#banchulDay').val());
			}
			parent.saveStatusAction(function(r) {
				$('#status').val("");
				$('#iphangDay').val("");
				$('#banipDay').val("");
				$('#singoDay').val("");
				$('#suriDay').val("");
				$('#banchulDay').val("");
				$('#singoNum1').val("");
				$('#singoNum2').val("");
				$('#singoNum3').val("");
				$('#changeForm #edmsStatus', parent.document).val("");
				$('#changeForm #singoNum', parent.document).val("");
				$('#changeForm #iphangDay', parent.document).val("");
				$('#changeForm #banipDay', parent.document).val("");
				$('#changeForm #singoDay', parent.document).val("");
				$('#changeForm #suriDay', parent.document).val("");
				$('#changeForm #banchulDay', parent.document).val("");
			});
		}
	}
});