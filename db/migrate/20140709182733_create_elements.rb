class CreateElements < ActiveRecord::Migration
  def change
    create_table :elements do |t|
      t.string :content
      t.integer :brief_id

      t.timestamps
    end
  end
end
