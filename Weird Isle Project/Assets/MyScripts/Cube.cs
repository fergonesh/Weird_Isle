using UnityEngine;
using System.Collections;

public class Cube : MonoBehaviour {
	public int moveSpeed = 10;
	public int turnSpeed = 10;
		
	// Update is called once per frame
	void Update () {
		if (Input.GetKey (KeyCode.UpArrow)) {
			transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);	
			transform.Rotate(Vector3.left, -turnSpeed * Time.deltaTime);
		}

		if (Input.GetKey (KeyCode.DownArrow)) {
			transform.Translate(-Vector3.forward * moveSpeed * Time.deltaTime);	
			transform.Rotate(Vector3.left, -turnSpeed * Time.deltaTime);
		}

		if (Input.GetKey (KeyCode.LeftArrow)) {
			transform.Rotate(Vector3.left, -turnSpeed * Time.deltaTime);		
		}

		if (Input.GetKey (KeyCode.RightArrow)) {
			transform.Rotate(Vector3.left, turnSpeed * Time.deltaTime);		
		}
	}
}
