describe("Simple", function(){

	it("detects something", function(){

		var guess = timezones_guess();

		expect(typeof guess).toBe("string");
	});
});

