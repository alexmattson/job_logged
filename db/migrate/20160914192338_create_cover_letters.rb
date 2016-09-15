class CreateCoverLetters < ActiveRecord::Migration[5.0]
  def change
    create_table :cover_letters do |t|
      t.integer :user_id, null: false
      t.string :cover_letter, null: false
      t.timestamps
    end
  end
end
