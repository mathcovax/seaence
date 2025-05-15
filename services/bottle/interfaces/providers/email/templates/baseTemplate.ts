function getCurrentYear() {
	return new Date().getFullYear();
}

export function baseTemplate(content: string) {
	return /* html */`
	<body style="margin: 0; padding: 0; background-color: #f6f8fa">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f6f8fa" style="padding: 40px 0">
      <tr>
        <td align="center">
          <table width="480" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius: 8px; box-shadow: 0 2px 8px #e0e7ef; overflow: hidden">
            <tr>
              <td align="center" style="padding: 32px 24px 16px 24px">
                <img src="./assets/logo-text.svg" alt="Seaence" width="192" style="display: block; margin-bottom: 24px" />
                
                ${content}
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#f6f8fa" style="padding: 16px 24px">
                <p style="font-family: Arial, sans-serif; color: #b0b0b0; font-size: 12px; margin: 0">
                  © ${getCurrentYear()} Seaence. Tous droits réservés.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
	`;
}
