-- Keep active-response and physical-interception records available to admins
-- while removing them from the published Russian catalog.
update public.products
set is_published = 0,
    updated_at = now()
where handle in (
  'handheld-capture-launcher',
  'directed-energy-system',
  'directional-rf-interference-device',
  'omni-directional-rf-interference-device',
  'aerial-navigation-airspace-data-verification-system'
);

update public.solutions
set is_published = 0,
    updated_at = now()
where handle in (
  'rf-signal-suppression',
  'rf-interference-device'
);
