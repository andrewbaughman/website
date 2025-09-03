<!doctype html>
<html>
    <head>
        <title>Today is ${weekday}.</title>
    </head>
    <body style="background-color: black">
        <h1
            style="color: white; font-size: 10rem; text-align: center"
            id="weekday"
        />

        <script>
            const weekday = new Date().toLocaleDateString("en-US", {
                weekday: "long",
            });
            document.getElementById("weekday").textContent =
                `Today is ${weekday}.`;
            document.title = `Today is ${weekday}.`;
        </script>
    </body>
</html>
