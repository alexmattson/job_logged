class AddColumnToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :event_type, :string, null: false, default: 'other'
  end
end
