class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.string :date_time, null: false
      t.text :notes
      t.integer :application_id, null: false
      t.timestamps
    end

    add_index :events, :application_id
  end
end
