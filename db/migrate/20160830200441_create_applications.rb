class CreateApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :applications do |t|
      t.string :company, null: false
      t.string :job_title, null: false
      t.string :progress, null: false
      t.integer :user_id, null: false, default: 'application'
      t.timestamps
    end

    add_index :applications, :user_id
  end
end
