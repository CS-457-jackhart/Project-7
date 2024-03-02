#version 330 compatibility

// lighting uniform variables -- these can be set once and left alone:
uniform float uKa;
uniform float uKd;
uniform float uKs;			// coefficients of each type of lighting -- make sum to 1.0
uniform float uShininess;	// specular exponent

in vec3	gN;		 // normal vector
in vec3	gL;		 // vector from point to light
in vec3	gE;		 // vector from point to eye

void
main()
{
	vec3 Normal = normalize(gN);
	vec3 Light = normalize(gL);
	vec3 Eye = normalize(gE);
	vec3 myColor = vec3(0.95, 0.95, 0.95);		// whatever default color you'd like
	vec3 mySpecularColor = vec3(1., 1., 1.);	// whatever default color you'd like

	// apply the per-fragment lighting to myColor:

	vec3 ambient = uKa * myColor;
	float d = 0.;
	float spec = 0.;
	if (dot(Normal, Light) > 0.) // only do specular if the light can see the point
	{
		d = dot(Normal, Light);
		vec3 ref = normalize(reflect(-Light, Normal)); // reflection vector
		spec = pow(max(dot(Eye, ref), 0.), uShininess);
	}
	vec3 diffuse = uKd * d * myColor;
	vec3 specular = uKs * spec * mySpecularColor;
	gl_FragColor = vec4(ambient + diffuse + specular, 1.);
}