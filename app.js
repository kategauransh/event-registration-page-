/* ===================================================================
   TechConf 2025 — Event Registration
   app.js  —  Form validation, character counter, accessibility
   =================================================================== */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function markValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const err = document.getElementById(input.getAttribute('aria-describedby')?.split(' ')[0]);
    if (err) err.textContent = '';
  }

  function markInvalid(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const errId = input.getAttribute('aria-describedby')?.split(' ')[0];
    const err = errId ? document.getElementById(errId) : null;
    if (err) err.textContent = message;
    return false;
  }

  /* ── Individual field validators ─────────────────────────────── */
  const validators = {
    'first-name': (v) => v.trim().length >= 2 ? true : 'First name must be at least 2 characters.',
    'last-name':  (v) => v.trim().length >= 2 ? true : 'Last name must be at least 2 characters.',
    'email':      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? true : 'Please enter a valid email address.',
    'phone':      (v) => v.trim() === '' || /^[\+\d\s\(\)\-]{7,20}$/.test(v.trim()) ? true : 'Please enter a valid phone number.',
    'ticket-type': (v) => v !== '' ? true : 'Please select a ticket type.',
  };

  function validateField(input) {
    const name = input.name;
    const validate = validators[name];
    if (!validate) return true;
    const result = validate(input.value);
    if (result === true) { markValid(input); return true; }
    return markInvalid(input, result);
  }

  function validateTracks() {
    const checked = $$('input[name="tracks"]:checked');
    const errEl = $('#tracks-err');
    if (checked.length === 0) {
      if (errEl) errEl.textContent = 'Please select at least one track.';
      return false;
    }
    if (errEl) errEl.textContent = '';
    return true;
  }

  function validateTerms() {
    const cb = $('#terms');
    if (!cb.checked) return markInvalid(cb, 'You must accept the terms to continue.');
    markValid(cb);
    return true;
  }

  /* ── Form ─────────────────────────────────────────────────────── */
  const form = $('#reg-form');
  const successMsg = $('#success-msg');
  const submitBtn = $('#submit-btn');

  if (!form) return;

  /* Live validation on blur */
  $$('.field__input', form).forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) validateField(input);
    });
  });

  /* Character counter for textarea */
  const textarea = $('#notes');
  const counter  = $('#notes-count');
  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      counter.textContent = `${textarea.value.length} / 500`;
    });
  }

  /* Submit */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Validate all fields */
    let valid = true;
    $$('.field__input', form).forEach(input => {
      if (!validateField(input)) valid = false;
    });
    if (!validateTracks()) valid = false;
    if (!validateTerms())  valid = false;

    if (!valid) {
      /* Focus the first invalid field */
      const firstInvalid = $('.is-invalid', form);
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* Simulate async submission */
    submitBtn.disabled = true;
    const label   = $('.btn__label', submitBtn);
    const spinner = $('.btn__spinner', submitBtn);
    if (label)   label.textContent = 'Submitting…';
    if (spinner) spinner.hidden = false;

    setTimeout(() => {
      form.hidden = true;
      successMsg.hidden = false;
      successMsg.focus();
    }, 1800);
  });

})();
