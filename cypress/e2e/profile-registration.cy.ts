describe("프로필 등록", () => {
  it("프로필 등록 플로우", () => {
    cy.login();

    cy.url().should("eq", "http://localhost:5173/");
    cy.wait(1000);

    cy.get("a[href='/find-teammates']").click();
    cy.url().should("include", "/find-teammates");
    cy.wait(1000);

    // 프로필이 이미 등록되어 있는지 확인하고 삭제
    cy.get("body").then(($body) => {
      if ($body.find("button:contains('삭제')").length > 0) {
        cy.get("button").contains("삭제").click();

        cy.get("[role='alertdialog']").should("be.visible");

        cy.get("[role='alertdialog']").within(() => {
          cy.get("button").contains("삭제").click();
        });

        cy.contains("프로필이 삭제되었습니다", { timeout: 5000 }).should(
          "be.visible",
        );
        cy.wait(1000); // 삭제 후 UI 업데이트 대기
      }
    });

    cy.get("button").contains("프로필 등록").click();
    cy.get("[role='dialog']").should("be.visible");

    cy.get("[role='dialog']").within(() => {
      cy.get("input[placeholder='오픈채팅 링크 또는 이메일 주소']")
        .clear()
        .type("contact@example.com");
    });

    cy.selectInDialog("select-job", "대학생");
    cy.selectInDialog("select-position", "프론트엔드");
    cy.selectInDialog("select-experience", "신입 (1년 이하)");
    cy.selectInDialog("select-region", "서울");
    cy.selectInDialog("select-domain", "커머스");

    cy.get("[role='dialog']").within(() => {
      cy.get("textarea[placeholder='간단히 역량 어필해 주세요.']")
        .clear()
        .type(
          "안녕하세요. React와 TypeScript를 다루는 프론트엔드 개발자입니다.",
        );

      cy.get("input[placeholder='https://example.com']")
        .should("be.visible")
        .clear()
        .type("https://github.com/test");

      cy.get("button[type='submit']").contains("등록 완료").click();
    });

    cy.get("[role='dialog']").should("not.exist");
    cy.contains("프로필 등록이 완료되었습니다", { timeout: 5000 }).should(
      "be.visible",
    );
  });
});
