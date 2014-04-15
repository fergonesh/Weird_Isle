﻿#pragma strict

static var textOn : boolean = false;
static var message: String;
private var timer : float;

function Start () {
	timer = 0.0;
	textOn  = false;
	guiText.text = "";
}

function Update () {
	if (textOn) {
		guiText.enabled = true;
		guiText.text = message;
		timer += Time.deltaTime;
	}
	
	if (timer >= 5) {
		textOn = false;
		guiText.enabled = false;
		timer = 0.0;
	}
}