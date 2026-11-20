const accountTabs = document.querySelectorAll("[data-account-tab]");
const accountForms = document.querySelectorAll(".account-form");
const accountNotice = document.getElementById("accountNotice");

const setActiveAccountForm = formName => {
  const activeForm = document.getElementById(formName) ? formName : "signin";

  accountTabs.forEach(tab => {
    const isActive = tab.dataset.accountTab === activeForm;
    tab.setAttribute("aria-pressed", String(isActive));
  });

  accountForms.forEach(form => {
    form.hidden = form.id !== activeForm;
  });

  accountNotice.hidden = true;
};

accountTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const formName = tab.dataset.accountTab;
    setActiveAccountForm(formName);
    if (window.location.hash !== `#${formName}`) {
      window.location.hash = formName;
    }
  });
});

window.addEventListener("hashchange", () => {
  setActiveAccountForm(window.location.hash.slice(1));
});

document.querySelectorAll("[data-account-submit]").forEach(button => {
  button.addEventListener("click", () => {
    const form = document.getElementById(button.dataset.accountSubmit);
    const password = form.elements.password;
    const confirmation = form.elements["confirm-password"];

    if (confirmation) {
      confirmation.setCustomValidity(
        confirmation.value === password.value ? "" : "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។"
      );
    }

    if (!form.reportValidity()) return;

    accountNotice.hidden = false;
  });
});

setActiveAccountForm(window.location.hash.slice(1));
