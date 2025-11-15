describe("프로필 등록", () => {
  it("프로필 등록 플로우", () => {
    // 1-3. 로그인 및 다이얼로그 열기
    cy.visit("http://localhost:5173/");
    cy.get("button").contains("로그인").click();
    cy.url().should("include", "/sign-in");

    cy.get("input[name='email']").type("test@test.com");
    cy.get("input[name='password']").type("123123123");
    cy.get("form").within(() => {
      cy.get("button[type='submit']").contains("로그인").click();
    });

    cy.url().should("eq", "http://localhost:5173/");
    cy.wait(1000);

    cy.get("a[href='/find-teammates']", { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.url().should("include", "/find-teammates");

    cy.get("button").contains("프로필 등록").click();
    cy.get("[role='dialog']", { timeout: 5000 }).should("be.visible");

    // 다이얼로그 안에서만 작업하기
    cy.get("[role='dialog']").within(() => {
      // 4. 연락 수단 입력
      cy.get("input[placeholder='오픈채팅 링크 또는 이메일 주소']")
        .clear()
        .type("contact@example.com");

      // 5. 현재 직무 선택
      cy.get("[data-testid='select-job']").click();
    });

    // listbox는 portal로 body에 렌더링되므로 dialog 밖에서 찾기
    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='option']").contains("대학생").click();

    // 다시 다이얼로그 안으로
    cy.get("[role='dialog']").within(() => {
      // 6. 희망 포지션 선택
      cy.get("[data-testid='select-position']").click();
    });
    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='option']").contains("프론트엔드").click();

    cy.get("[role='dialog']").within(() => {
      // 7. 관련 경력 선택
      cy.get("[data-testid='select-experience']").click();
    });
    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='option']").contains("신입 (1년 이하)").click();

    cy.get("[role='dialog']").within(() => {
      // 8. 활동 지역 선택
      cy.get("[data-testid='select-region']").click();
    });
    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='option']").contains("서울").click();

    cy.get("[role='dialog']").within(() => {
      // 9. 희망 도메인 선택
      cy.get("[data-testid='select-domain']").click();
    });
    cy.get("[role='listbox']").should("be.visible");
    cy.get("[role='option']").contains("커머스").click();

    cy.get("[role='dialog']").within(() => {
      // 10. 자기소개 입력
      cy.get("[data-testid='textarea-introduction']")
        .clear()
        .type(
          "안녕하세요. React와 TypeScript를 다루는 프론트엔드 개발자입니다. 함께 성장하고 싶습니다.",
        );

      // 11. 외부 링크 입력 (data-cy -> data-testid로 수정)
      cy.get("[data-testid='input-external-url']")
        .clear()
        .type("https://github.com/test");

      // 12. 등록 완료 버튼 클릭
      cy.get("button[type='submit']").contains("등록 완료").click();
    });

    // 13. 다이얼로그가 닫히는지 확인
    cy.get("[role='dialog']").should("not.exist");

    // 14. 성공 메시지 확인
    cy.contains("프로필 등록이 완료되었습니다", { timeout: 5000 }).should(
      "be.visible",
    );
  });
});
