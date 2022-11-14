const loginWeb = {
  loginPage: function () {
    return `
      <!doctype html>
      <html>
          <head>
            <title>Express</title>
  
          </head>
          <body>
            <form action="/login" method="POST">
              <input 
                class="username" 
                name="username" 
                type="text" 
                placeholder="Enter your username" 
                required
              />
            </form>
          </body>
      </html>
    `;
  },

  dataPage: function () { },
};
