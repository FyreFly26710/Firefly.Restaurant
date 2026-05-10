type MenuSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MenuSearch({ value, onChange }: MenuSearchProps) {
  return (
    <div className="menu-search-row">
      <label className="sr-only" htmlFor="menu-search">
        Search menu
      </label>
      <div className="search-field">
        <span className="search-field-mark" aria-hidden="true">
          *
        </span>
        <input
          id="menu-search"
          name="menu-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search dishes, ingredients, or tags"
        />
      </div>
    </div>
  );
}
