#pragma strict

var batteryCollect : AudioClip;

private var doorIsOpen: boolean = false;
private var doorTimer: float = 0.0;
private var currentDoor: GameObject;

private var flames: GameObject;
private var smoke: GameObject;


var doorOpenTime: float = 3.0;
var doorOpenSound: AudioClip;
var doorShutSound: AudioClip;

var matchGUI: GameObject;
private var haveMatches: boolean = false;

function Start() {
	var campfire : GameObject = GameObject.Find("campfire");

	flames = campfire.Find("FireSystem");
	flames.SetActive(false);	

	smoke = campfire.Find("SmokeSystem");
	smoke.SetActive(false);	
}

function Update () {
	var hit: RaycastHit;
	
	if (Physics.Raycast(transform.position, transform.forward, hit, 5)) {
		if (hit.collider.gameObject.tag == "outpostDoor" && doorIsOpen == false && BatteryCollect.charge >= 4) {
			currentDoor = hit.collider.gameObject;
			
			Door(doorOpenSound, true, "dooropen", currentDoor);
			GameObject.Find("Battery GUI").GetComponent(GUITexture).enabled = false;
		} else if (hit.collider.gameObject.tag == "outpostDoor" && doorIsOpen == false && BatteryCollect.charge < 4) {
			GameObject.Find("Battery GUI").GetComponent(GUITexture).enabled = true;		
			
			TextHints.message = "The door seems to need more power...";
			TextHints.textOn = true;	
		}
	}

	if (doorIsOpen) {
		doorTimer += Time.deltaTime;
		
		if (doorTimer > doorOpenTime) { 
			//shutDoor();
			
			Door(doorShutSound, false, "doorshut", currentDoor);
			doorTimer = 0.0;
		}
	}
}

function Door(aClip: AudioClip, openCheck: boolean, animName: String, thisDoor: GameObject) {
	audio.PlayOneShot(aClip);
	doorIsOpen = openCheck;
	
	thisDoor.transform.parent.animation.Play(animName);
}

function OnTriggerEnter(collisionInfo : Collider) {	
	if (collisionInfo.gameObject.tag == "battery") {
		BatteryCollect.charge++;
		Debug.Log("Battery Colider");
			
		audio.PlayOneShot(batteryCollect);
		Destroy(collisionInfo.gameObject);
	}
	
	if (collisionInfo.gameObject.name == "matchbox") {
		Destroy(collisionInfo.gameObject);
		Debug.Log("Matches Colider");
		
		haveMatches = true;
		audio.PlayOneShot(batteryCollect);
		
		var matchGUIobj = Instantiate(matchGUI, Vector3(0.15, 0.1, 0), transform.rotation);
		matchGUIobj = matchGUI;
	}
}

function OnControllerColliderHit(hit: ControllerColliderHit) {
	if (hit.collider.gameObject == GameObject.Find("campfire")) {
		if (haveMatches) {
			lightFire();	
		} else {
			TextHints.textOn = true;
			TextHints.message = "I'll need some matches to light this camp fire..";	
		}
		
	}
}

function lightFire() {
	var campfire : GameObject = GameObject.Find("campfire");	
	var campSound : AudioSource = campfire.GetComponent(AudioSource);
	campSound.Play();
	
	flames.SetActive(true);	
	smoke.SetActive(true);		
}

/*
function OnControllerColliderHit(hit: ControllerColliderHit) {
	if (hit.gameObject.tag == "outpostDoor" && doorIsOpen == false) {
		//OpenDoor();
		
		currentDoor = hit.gameObject;
		Door(doorOpenSound, true, "dooropen", currentDoor);
	}
}
*/
//function openDoor() {
//	audio.PlayOneShot(doorOpenSound);
//	doorIsOpen = true;
//	
//	var myOutpost: GameObject = GameObject.Find("outpost");
//	myOutpost.animation.Play("dooropen");
//}

//function shutDoor() {
//	audio.PlayOneShot(doorShutSound);
//	doorIsOpen = false;
//	
//	var myOutpost: GameObject = GameObject.Find("outpost");
//	myOutpost.animation.Play("doorshut");
//}

@script RequireComponent(AudioSource)