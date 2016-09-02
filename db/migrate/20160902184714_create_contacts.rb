class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.string :fname
      t.string :lname
      t.string :phone
      t.string :email
      t.sting :address
      t.integer :application_id, null: false
      t.timestamps
    end

    add_index :contacts, :application_id
  end
end
