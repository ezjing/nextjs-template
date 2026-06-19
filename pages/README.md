# 이 폴더는 의도적으로 비어 있습니다 (Next.js + FSD)

App Router 를 사용하지만, FSD 의 `pages` 레이어는 `src/pages` 에 위치합니다.

이 루트 `pages/` 폴더가 없으면 Next.js 가 `src/pages` 를 **Pages Router** 로 인식해
App Router 와 충돌하여 빌드가 실패합니다.

따라서 이 폴더는 비워 둔 채로 유지해야 하며, 실제 페이지 코드는 `src/pages/<slice>` 에
작성하고 루트 `app/<route>/page.tsx` 에서 re-export 합니다.

참고: https://fsd.how/kr/docs/guides/tech/with-nextjs/
